import { useNavigate, useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react';

export default function ReLink() {
    let { link } = useParams();
    link = link ? link : '/'
    link = link.replaceAll('.', '/')
    const navigate = useNavigate();
    const fetchGameRounds = async () => {
        navigate(link);
    }

    useEffect(() => {
        fetchGameRounds()
      }, [])
    console.log(link)
}