import React, { useState, useEffect, useRef } from 'react'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import Ionicons from '@expo/vector-icons'

export default function Foto() {
    //referência da câmera
    const cameraRef = useRef(null)
    //status de acesso a câmera
    const [temPermissao, setTemPermissao] = useState(null)
    const [temPermissaoGaleria, setTemPermissaoGaleria] = useState(null)
    const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.back)
    const [tipoFlash, setTipoFlash] = useState(Camera.Constants.FlashMode.off)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestMicrophonePermissionsAsync()
            setTemPermissao(status === 'granted')
        })();
    }, [])
    if (temPermissao === null) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Dispositivo sem câmera {`${temPermissao}`}</Text>
            </SafeAreaView>
        )
    }


    if (temPermissao === false) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Sem acesso à câmera {`${temPermissao}`}</Text>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Camera
                style={{flex:1}}
                type={tipoCamera}
                flashMode={tipoFlash}
                ratio={"16:9"}
                ref={cameraRef}
                >
            
                <TouchableOpacity
                    onPress={()=>
                        setTipoCamera(
                            tipoCamera === Camera.Constants.Type.back 
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        )}
                >
                    <Ionicons 
                            name={'md-camera-reverse'} 
                            size={40}
                            color="#9E9E9E" />
                </TouchableOpacity>
            </Camera>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: { 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center' 
        }
})