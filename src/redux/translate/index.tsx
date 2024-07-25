import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface TranslateState {
  fromLanguage: string;
  toLanguage: string;
  text: string;
  translatedText: string;
  error: string;
  loading: boolean;
}

const initialState: TranslateState = {
  fromLanguage: "tr-TR",
  toLanguage: "en-GB",
  text: "",
  translatedText: '',
  error: '',
  loading: false,
};

interface TranslationResponse {
  responseData: {
    translatedText: string;
  };
}

export const fetchTranslate = createAsyncThunk<TranslationResponse, { text: string; fromLanguage: string; toLanguage: string }>(
  "translate/getTranslate",
  async ({ text, fromLanguage, toLanguage }) => {
    const res = await axios.get(`https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLanguage}|${toLanguage}`);
    return res.data;
  }
);

export const translateSlice = createSlice({
  name: 'translate',
  initialState,
  reducers: {
    changeText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    clearTranslatedText: (state) => {
      state.translatedText = "";
    },
    changeFromLanguage: (state, action: PayloadAction<string>) => {
      state.fromLanguage = action.payload;
    },
    changeToLanguage: (state, action: PayloadAction<string>) => {
      state.toLanguage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTranslate.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTranslate.fulfilled, (state, action) => {
        state.translatedText = action.payload.responseData.translatedText;
        state.loading = false;
      })
      .addCase(fetchTranslate.rejected, (state, action) => {
        state.error = action.error.message || 'Something went wrong';
        state.loading = false;
      });
  }
});

export const { changeText, clearTranslatedText, changeFromLanguage, changeToLanguage } = translateSlice.actions;
export default translateSlice.reducer;
