"use client"
import React, { useCallback } from 'react';
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countriesArray from '@/utils/countries';
import { useDispatch, useSelector } from 'react-redux';
import { changeFromLanguage, changeText, fetchTranslate } from '@/redux/translate';
import type { RootState } from '@/redux/store';
import { debounce } from "lodash"
import { AppDispatch } from '@/redux/store';

function FromLanguage() {
  const { text, toLanguage, fromLanguage } = useSelector((state: RootState) => state.translate);
  const dispatch: AppDispatch = useDispatch();

  const handleChangeLanguage = async (value: string) => {
    await dispatch(changeFromLanguage(value));
    await dispatch(fetchTranslate({ text, fromLanguage: value, toLanguage }));
  };

  const debouncedFetchTranslate = useCallback(
    debounce(async (text: string) => {
      await dispatch(fetchTranslate({ text, fromLanguage, toLanguage }));
    }, 500),
    [dispatch, fromLanguage, toLanguage]
  );

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    dispatch(changeText(newText));
    debouncedFetchTranslate(newText);
  };

  return (
    <div className='w-full flex flex-col'>
      <Select value={fromLanguage} onValueChange={handleChangeLanguage}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Languages</SelectLabel>
            {countriesArray.map(([code, name], key) => (
              <SelectItem key={key} value={code}>{name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Textarea autoFocus onChange={handleChangeText} placeholder="" />
    </div>
  );
}

export default FromLanguage;
