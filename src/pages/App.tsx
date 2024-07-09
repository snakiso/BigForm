import {Form} from "../compotents/form/Form.tsx";
import {useGetSettingsQuery} from "../services/api.ts";
import {BrowserRouter} from "react-router-dom";

export function App() {

    const {data: settings} = useGetSettingsQuery(undefined)


    return (
        <BrowserRouter>
            <div className={'container'}>
                <h2 className={'page__title'}>{settings?.title}</h2>
                <Form/>
            </div>
        </BrowserRouter>
    )
}


