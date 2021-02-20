import React, { useEffect, useState } from 'react'
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
} from "native-base"
import { API_URL } from '../GLOBAL';

const TrainerScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    // console.log(data);

    // console.log(`${API_URL}/instructor?instructorId=${navigation.state.params.id}`);

    useEffect(() => {
        fetch(`${API_URL}/instructor?instructorId=${navigation.state.params.id}`)
            .then((response) => response.json())
            .then((result) => setData(result))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Container>
            <Content>
                {isLoading ? <Text>Loading...</Text> :
                    <Text>{data}</Text>}
            </Content>
        </Container>
    )
}

export default TrainerScreen
