import {Dispatch, SetStateAction, useEffect} from 'react';
import {Location} from "react-router-dom";

export function useGetParams(location: Location,
                             setFormOfParticipation: Dispatch<SetStateAction<string>>,
                             setTypeOfActivity: Dispatch<SetStateAction<string>>,
                             setPartnerStatus: Dispatch<SetStateAction<string>>,
                             setRosasfaltMembership: Dispatch<SetStateAction<string>>,
                             setDopOptions: Dispatch<SetStateAction<string[]>>
) {
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const selectFormOfParticipationValueFromParams = searchParams.get('formOfParticipation');
        const selectPartnerStatusValueFromParams = searchParams.get('formOfPartner');
        const selectRosasfaltMembershipValueFromParams = searchParams.get('rosasfaltMembership');
        const currentDopOptions = searchParams.get('partnership_options');
        if (selectFormOfParticipationValueFromParams) {
            setTypeOfActivity('commerce')
            setFormOfParticipation(selectFormOfParticipationValueFromParams);
        }
        if (selectPartnerStatusValueFromParams) {
            setPartnerStatus(selectPartnerStatusValueFromParams);
        }
        if (selectRosasfaltMembershipValueFromParams) {
            setRosasfaltMembership(selectRosasfaltMembershipValueFromParams)
        }
        if(currentDopOptions){
            const currentArr = currentDopOptions.split(',')
            setDopOptions(currentArr)
        }
    }, []);
}

