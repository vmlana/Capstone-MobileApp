import React, { useEffect, useState } from 'react'
import {
    Container,
    Content,
    Thumbnail
} from "native-base"

import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'

import { getInstructorInfo } from '../data/api'
import ContentContainer from '../components/Home/ContentContainer'

const TrainerScreen = ({ navigation }) => {

    const { container, instructorPrimary, nameSpeciality, speciality, thumbnail, trainerName, trainerSpeciality, trainerResume, trainerContact, trainerEmail,
        recommendedHeader, recommendedContent } = styles

    const [instructorInfo, setinstructorInfo] = useState([]);

    useEffect(() => {
        getInstructorInfo(navigation.state.params.instructorID).then(
            instructor => {
                setinstructorInfo(instructor)
            }
        )
    }, [])

    return (
        <ScrollView>
            <View style={container}>
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
                <Text style={recommendedHeader}>Recommended Sessions by same trainer {console.log(instructorInfo)}</Text>

            </View>
            <View style={recommendedContent}>
                <FlatList
                    style={{ marginBottom: 20 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={instructorInfo.playlists}
                    keyExtractor={(item, index) => {
                        return item.toString() + index;
                    }}
                    renderItem={({ item }) => (
                        <ContentContainer
                            result={item}
                            type='playlists'
                            navigation={navigation}
                        />
                    )}

                // numColumns={2}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 25
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
        fontFamily: "GothamRoundedBold_21016",
        fontSize: 22,
        color: '#707070',
        lineHeight: 26
    },
    speciality: {
        fontFamily: 'GothamMedium',
        fontSize: 12,
        lineHeight: 23,
        color: '#707070'
    },
    trainerSpeciality: {
        fontFamily: 'GothamBook',
        marginLeft: 10,
        fontSize: 12,
        lineHeight: 23,
        color: '#707070'
    },
    trainerResume: {
        fontFamily: 'GothamBook',
        fontSize: 13,
        lineHeight: 17,
        marginTop: 27,
        color: '#A3A3A3'
    },
    trainerContact: {
        fontFamily: 'GothamMedium',
        fontSize: 15,
        lineHeight: 20,
        marginTop: 32,
        color: '#707070'
    },
    trainerEmail: {
        fontFamily: 'GothamBook',
        marginLeft: 24
    },
    recommendedHeader: {
        fontFamily: "GothamRoundedBold_21016",
        fontSize: 22,
        color: '#707070',
        lineHeight: 26,
        textAlign: 'center',
        marginTop: 50,
    },
    recommendedContent: {
        paddingLeft: 25
    }
});

export default TrainerScreen
