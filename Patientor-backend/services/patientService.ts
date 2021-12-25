import patientsEntries from "../data/patientsEntries";
import { NonSSNPatient } from "../types";

const getNonSSNEntries = (): NonSSNPatient[] => {
    return patientsEntries.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}; 

export default {
    getNonSSNEntries
};