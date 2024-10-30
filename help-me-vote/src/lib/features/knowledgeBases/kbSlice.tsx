import { RootState } from "@/lib/store";
import { KnowledgeBase } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface KnowledgeBaseState {
    knowledgeBases: KnowledgeBase[];
}

const initialState: KnowledgeBaseState = {
    knowledgeBases: [],
}

export const kbSlice = createSlice({
    name: 'knowledgeBases',
    initialState,
    reducers: {
        setKnowledgeBases: (state, action: PayloadAction<KnowledgeBase[]>) => {
            state.knowledgeBases = action.payload;
        },
        addKnowledgeBase: (state, action: PayloadAction<KnowledgeBase>) => {
            state.knowledgeBases.push(action.payload);
        }
    }
})

export const { setKnowledgeBases, addKnowledgeBase } = kbSlice.actions;
export const selectKnowledgeBases = (state: RootState) => state.knowledgeBases.knowledgeBases;
export default kbSlice.reducer;