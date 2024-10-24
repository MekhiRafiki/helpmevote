import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
    usedNotionUrls: string[];
    viewLibrary: boolean;
}

const initialState: ChatState = {
    usedNotionUrls: [],
    viewLibrary: false
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addUsedNotionUrl: (state, action: PayloadAction<string>) => {
            state.usedNotionUrls.push(action.payload);
        },
        setUsedNotionUrls: (state, action: PayloadAction<string[]>) => {
            state.usedNotionUrls = action.payload;
        },
        setViewLibrary: (state, action: PayloadAction<boolean>) => {
            state.viewLibrary = action.payload;
        }
    }
})

export const { addUsedNotionUrl, setUsedNotionUrls, setViewLibrary } = chatSlice.actions;
export const selectUsedNotionUrls = (state: RootState) => state.chat.usedNotionUrls;
export const selectViewLibrary = (state: RootState) => state.chat.viewLibrary;
export default chatSlice.reducer;