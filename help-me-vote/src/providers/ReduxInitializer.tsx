'use client'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setKnowledgeBases, selectKnowledgeBases } from '@/lib/features/knowledgeBases/kbSlice';
import { fetchAllKnowledgeBases } from '@/actions/resources';
import { KnowledgeBase } from '@/types';

export function ReduxInitializer() {
    const dispatch = useDispatch();
    const knowledgeBases = useSelector(selectKnowledgeBases);

    useEffect(() => {
        // Only fetch if we haven't already loaded the knowledge bases
        if (knowledgeBases.length === 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            fetchAllKnowledgeBases().then((kbs: any[]) => {
                dispatch(setKnowledgeBases(kbs as KnowledgeBase[]));
                console.log('knowledgeBases', knowledgeBases);
            });
        }
    }, [dispatch, knowledgeBases, knowledgeBases.length]);

    return null;
}