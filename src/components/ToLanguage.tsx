"use client"
import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import countriesArray from '@/utils/countries'

/// redux
import { useDispatch, useSelector } from 'react-redux';
import { changeToLanguage, fetchTranslate } from '@/redux/translate';
import type { RootState } from '@/redux/store';
import { AppDispatch } from '@/redux/store';

function ToLanguage() {

  const { text, fromLanguage, toLanguage, translatedText, loading, error } = useSelector((state: RootState) => state.translate);
  const dispatch: AppDispatch = useDispatch();


  const handleChange = async (value: string) => {
    await dispatch(changeToLanguage(value))
    await dispatch(fetchTranslate({ text,fromLanguage,toLanguage:value }))
  }

  return (
    <div className='w-full flex flex-col'>
    <Select value={toLanguage} onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Languages</SelectLabel>
              {
                countriesArray.map(([code,name],key) => {
                  return <SelectItem key={key} value={code}>{name}</SelectItem>
                })
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      <Textarea 
      style={{ backgroundColor: "#f5f5f5" }} 
      readOnly 
      placeholder={loading ? "Çevriliyor..." : "Çeviri"} 
      value={translatedText === "NO QUERY SPECIFIED. EXAMPLE REQUEST: GET?Q=HELLO&LANGPAIR=EN|IT" ? "" : translatedText} />
      <div className='text-red-500 font-bold'>
        {
          error && "Bir Şeyler Ters Gitti Lütfen Tekrar Deneyiniz !"
        }
      </div>
    </div>  
  )
}

export default ToLanguage