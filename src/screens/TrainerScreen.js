import React, { useEffect, useState } from 'react'
import {
    Container,
    Content,
    Thumbnail
} from "native-base"

import { StyleSheet, Text, View } from 'react-native'

import { getInstructorInfo } from '../data/api'

const TrainerScreen = ({ navigation }) => {

    const { container, instructorPrimary, nameSpeciality, speciality, thumbnail, trainerName, trainerSpeciality, trainerResume, trainerContact, trainerEmail,
        recommendedHeader } = styles

    const [instructorInfo, setinstructorInfo] = useState([]);

    useEffect(() => {
        getInstructorInfo(navigation.state.params.instructorID).then(
            instructors => {
                instructors.map(instructor => {
                    setinstructorInfo(instructor)
                })
            }
        )
    }, [])

    return (
        <Container style={container}>
            <Content>
                <View style={instructorPrimary}>
                    {
                        instructorInfo.imageFile == null
                            ?
                            <Thumbnail large source={{ uri: `https://www.ommel.fi/content/uploads/2019/03/dummy-profile-image-male.jpg` }} style={thumbnail} />
                            :
                            <Thumbnail large source={{ uri: instructorInfo.imageFile }} style={thumbnail} />
                    }
                    <View style={nameSpeciality}>

                        <Text style={trainerName}>{instructorInfo.instructorName}</Text>
                        <Text style={speciality}>Speciality: <Text style={trainerSpeciality}>{instructorInfo.specializationArea}</Text></Text>
                    </View>
                </View>

                <Text style={trainerResume}>{instructorInfo.resume}</Text>
                <Text style={trainerContact}>Contact: <Text style={trainerEmail}>{instructorInfo.userLogin}</Text></Text>

                <View>
                    <Text style={recommendedHeader}>Recommended Sessions by same trainer</Text>
                </View>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 33
    },
    instructorPrimary: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    thumbnail: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    nameSpeciality: {
        marginLeft: 22,
        color: '#707070'
    },
    trainerName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#707070',
        lineHeight: 26
    },
    speciality: {
        fontSize: 12,
        lineHeight: 23,
        color: '#707070'
    },
    trainerSpeciality: {
        marginLeft: 10,
        fontSize: 12,
        lineHeight: 23,
        color: '#707070'
    },
    trainerResume: {
        fontSize: 13,
        lineHeight: 17,
        marginTop: 27,
        color: '#A3A3A3'
    },
    trainerContact: {
        fontSize: 15,
        lineHeight: 29,
        color: '#707070'
    },
    trainerEmail: {
        marginLeft: 24
    },
    recommendedHeader: {
        fontSize: 22,
        color: '#707070',
        lineHeight: 26,
        textAlign: 'center',
        marginTop: 50
    }
});

export default TrainerScreen
