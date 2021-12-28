import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SemanticICONS, Card, Icon} from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient, Gender } from "../types";

const SpecificPatient = () => {
    const {id} = useParams<{id : string}>();
    const [{patients}, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        const fetchedPatient = async () => {
            try {
                const { data } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch({type: "SET_SPECIFIC_PATIENT", payload: data});
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
            )}
        </>
    );
};

export default SpecificPatient;