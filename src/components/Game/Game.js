import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import "./Game.css";

export default function Game() {
    const currentQuestion = useSelector((state) => state.currentQuestion);
    const currentScore = useSelector((state) => state.score);

    return (
        <div className="game-container">
            <div className="nav-button">
                <Link to="/"> Back </Link>
            </div>
            <div className="score-container">
                <strong>Current Score: </strong>{currentScore}
            </div>
            
            <div className="game-section">
                <p className="section-title">Conjugate the following verb:</p>
                <p id="verb"><span id="spanish-verb">{currentQuestion.spanishVerb}</span> - <span id="english-verb">{currentQuestion.englishVerb}</span></p>
                
                <div className="question-container">
                    <p id="tense-pronoun">{currentQuestion.tense} tense - {currentQuestion.pronoun}</p>
                    <input id="answer-input" />
                    <div className="button-container">
                        <button>á</button>
                        <button>é</button>
                        <button>í</button>
                        <button>ó</button>
                        <button>ú</button>
                        <button>ñ</button>
                    </div>
                </div>
            </div>
            <button id="btn-submit">Submit</button>
        </div>
    )
}
