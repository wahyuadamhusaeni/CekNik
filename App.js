import {Body, Container, Header, Left, Right, Title} from 'native-base';
import React, {Component} from 'react';
import {TextInput, View, TouchableOpacity, Text, Alert} from 'react-native';
import Axios from 'axios';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      StatusNik: false,
      keyword: '',
      nik: '',
      nama: '',
      jenisKelamin: '',
      namaPropinsi: '',
      namaKabKota: '',
      namaKecamatan: '',
      namaKelurahan: '',
      tanggal_lahir: '',
    };
  }

  _search = async () => {
    this.setState({
      StatusNik: false,
      isloading: true,
      nik: '',
      nama: '',
      jenisKelamin: '',
      namaPropinsi: '',
      namaKabKota: '',
      namaKecamatan: '',
      namaKelurahan: '',
      tanggal_lahir: '',
    });
    Axios.post(`http://api.kitabuat.com/nik/search`, {
      nik: this.state.keyword,
    }).then(result => {
      if (result.data.status === true) {
        this.setState({
          StatusNik: result.data.status,
          nik: result.data.data.nik,
          nama: result.data.data.nama,
          jenisKelamin: result.data.data.jenisKelamin,
          namaPropinsi: result.data.data.namaPropinsi,
          namaKabKota: result.data.data.namaKabKota,
          namaKecamatan: result.data.data.namaKecamatan,
          namaKelurahan: result.data.data.namaKelurahan,
          tanggal_lahir: result.data.data.tanggal_lahir,
          isloading: false,
        });
      } else {
        this.setState({
          StatusNik: result.data.status,
          nik: '',
          nama: '',
          jenisKelamin: '',
          namaPropinsi: '',
          namaKabKota: '',
          namaKecamatan: '',
          namaKelurahan: '',
          tanggal_lahir: '',
          isloading: false,
        });
        Alert.alert('Peringatan !', 'Data Tidak Ditemukan ');
      }
    });
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>NIK ID</Title>
          </Body>
          <Right />
        </Header>
        <View
          style={{marginTop: 10, marginHorizontal: 10, flexDirection: 'row'}}>
          <TextInput
            keyboardType="numeric"
            style={{width: '80%', borderWidth: 0.8, borderColor: '#333'}}
            placeholder="NIK"
            onChangeText={this.handleChange('keyword')}
            value={this.state.keyword}
            onSubmitEditing={this._search}
          />
          <TouchableOpacity
            style={{
              marginLeft: 10,
              flex: 1,
              backgroundColor: '#002663',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={this._search}>
            <Text style={{color: 'white'}}>CEK</Text>
          </TouchableOpacity>
        </View>
        <OrientationLoadingOverlay
          visible={this.state.isloading}
          color="white"
          indicatorSize="large"
          messageFontSize={18}
          message="Loading..."
        />

        {this.state.StatusNik ? (
          <View style={{marginTop: 10, backgroundColor: '#caccd1'}}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{width: '35%'}}>NIK</Text>
              <Text style={{width: '5%'}}>:</Text>
              <Text>{this.state.nik}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{width: '35%'}}>NAMA</Text>
              <Text style={{width: '5%'}}>:</Text>
              <Text>{this.state.nama}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{width: '35%'}}>JENIS KELAMIN</Text>
              <Text style={{width: '5%'}}>:</Text>
              <Text>{this.state.jenisKelamin}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{width: '35%'}}>PROVINSI</Text>
              <Text style={{width: '5%'}}>:</Text>
              <Text>{this.state.namaPropinsi}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{width: '35%'}}>KAB/KOTA</Text>
              <Text style={{width: '5%'}}>:</Text>
              <Text>{this.state.namaKabKota}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{width: '35%'}}>KECAMATAN</Text>
              <Text style={{width: '5%'}}>:</Text>
              <Text>{this.state.namaKecamatan}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{width: '35%'}}>KELURAHAN</Text>
              <Text style={{width: '5%'}}>:</Text>
              <Text>{this.state.namaKelurahan}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{width: '35%'}}>TGL LAHIR</Text>
              <Text style={{width: '5%'}}>:</Text>
              <Text>{this.state.tanggal_lahir}</Text>
            </View>
          </View>
        ) : (
          <View></View>
        )}
      </Container>
    );
  }
}
