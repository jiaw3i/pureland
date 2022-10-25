import request from "../utils/request";
import {ExperienceItemType, TodoItemType, UserInfo} from "../utils/types";
import {QuestionType} from "../page/exercise/pages/questionmanager/qmanage";

export function insertTag(tagName: string) {
    return request(
        {
            url: '/tag/insert',
            method: 'GET',
            params: {
                tagName: tagName
            }
        }
    )
}

export function getAllTag() {
    return request(
        {
            url: '/tag/all',
            method: 'GET',
        }
    )
}

export function deleteTagById(id: number) {
    return request(
        {
            url: `/tag/${id}/delete`,
            method: 'GET',
        }
    )
}


export function getQuestions() {
    return request(
        {
            url: '/qa/questions',
            method: 'GET',
        }
    )
}

export function insertQuestion(question: QuestionType) {
    return request(
        {
            url: '/qa/question/insert',
            method: "POST",
            params: {
                ...question
            }
        }
    )
}

export function getQuestionById(id: number) {
    return request(
        {
            url: `/qa/question/${id}`,
            method: 'GET',
        }
    )
}