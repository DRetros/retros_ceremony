import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Storage from "./services/StorageService"

export default function Profile3Box() {
    const settings = useSelector(state => state.retrospective.settings3box)
    const [spaces, setSpace] = useState([]);

    useEffect(
        () => {
            async function fetchRetrospectives() {
                const storage = new Storage();
                const sAvailable = await storage.getRetrospectives(settings.account);
                console.log("spaces");
                console.log(sAvailable);
                setSpace(sAvailable);
            }
          
            fetchRetrospectives();
        }, []);

    console.log(settings.thread);
    
    return (
        <div className="panel-landing" id="section-1">
            <h1 className="landing-heading">Welcome {settings.profile.name}!</h1>
            <p className="lead">
                {settings.account}
            </p>
            <p className="lead">
                Retrospectives available...
            </p>
            <ul>
                {spaces.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    )
}