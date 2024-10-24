import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Topic } from "@/types";
import { RootState } from "@/lib/store";
import { TOPICS } from "@/constants/topics";

interface TopicsState {
    topics: Topic[];
    chosenTopic: Topic | null;
}

const initialState: TopicsState = {
    topics: TOPICS,
    chosenTopic: null
}

export const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        setTopics: (state, action: PayloadAction<Topic[]>) => {
            state.topics = action.payload;
        },
        setChosenTopic: (state, action: PayloadAction<Topic | null>) => {
            state.chosenTopic = action.payload;
        }
    }
})

export const { setTopics, setChosenTopic } = topicsSlice.actions;
export const selectTopics = (state: RootState) => state.topics.topics;
export const selectChosenTopic = (state: RootState) => state.topics.chosenTopic;
export default topicsSlice.reducer;