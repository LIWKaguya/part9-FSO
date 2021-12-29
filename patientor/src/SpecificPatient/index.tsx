import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SemanticICONS, Card, Icon, Segment} from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { setSpecificPatient, useStateValue } from "../state";
import { Patient, Gender } from "../types";

const SpecificPatient = () => {
    const {id} = useParams<{id : string}>();
    const [{patients, diagnoses}, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        const fetchedPatient = async () => {
            try {
                const { data: specificPatient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(setSpecificPatient(specificPatient));
            } catch (err) {
                console.log(err);
            }
        };
        if(patients[id] && patients[id].ssn) {
            setPatient(patients[id]);
        } else {
            void fetchedPatient();
        }
    }, [id]);

    const genderIcon = (gender: Gender): SemanticICONS => {
        switch(gender) {
            case "male":
                return "mars";
            case "female":
                return "venus";
            default:
                return "genderless";
        }
    };
    return (
        <>
            {patient && (
                <>
                <Card>
                    <Card.Content>
                        <Card.Header>
                            {patient.name}
                            <Icon name={genderIcon(patient.gender)} />
                        </Card.Header>
                        <Card.Description>
                            {`occupation : ${patient.occupation}`} <br />
                            {`ssn: ${patient.ssn}`}
                        </Card.Description>                    
                    </Card.Content>
                </Card>
                <Segment>
                    <h2>Entries</h2>
                    {patient.entries.map(entry =>
                    <div key={entry.date}> 
                        <p>{entry.date} <em>{entry.description}</em></p>
                        <ul>
                            {entry.diagnosisCodes?.map(code => 
                                <li key={code}>
                                    {code}: {diagnoses[code].name}
                                </li>    
                            )}
                        </ul>
                    </div>
                    )}
                </Segment>
                </>
            )}
        </>
    );
};

export default SpecificPatient;