import {Location, NavigateFunction} from "react-router-dom";
import {useEffect} from "react";

export function useDeleteParams(location: Location,
                                typeOfActivity: string,
                                partnerStatus: string,
                                formOfParticipation: string,
                                rosAsfaltMembership: string,
                                dopOptions: string[],
                                navigate: NavigateFunction) {
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        if (formOfParticipation) {
            searchParams.set('formOfParticipation', formOfParticipation);
        } else {
            searchParams.delete('formOfParticipation');
            searchParams.delete('formOfPartner');
        }
        if (formOfParticipation === 'partner' && partnerStatus) {
            searchParams.set('formOfPartner', partnerStatus);
        } else {
            searchParams.delete('formOfPartner');
        }
        if (formOfParticipation === 'delegate' && rosAsfaltMembership) {
            searchParams.set('rosasfaltMembership', rosAsfaltMembership)
        } else {
            searchParams.delete('rosasfaltMembership')
        }
        if (dopOptions.length) {
            const url = dopOptions.join(',')
            searchParams.set('partnership_options', url)
        } else {
            searchParams.delete('partnership_options')
        }
        if (typeOfActivity !== 'commerce') {
            searchParams.delete('formOfParticipation');
            searchParams.delete('formOfPartner');
        }

        navigate(`?${searchParams.toString()}`);
    }, [typeOfActivity, partnerStatus, formOfParticipation, rosAsfaltMembership,dopOptions]);

}

