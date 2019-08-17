import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from "axios"

export function getSingerList(param) {
  // const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const url='/api/getSingerList'
  const data = Object.assign({}, commonParams, {
  /*  channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'*/
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq.json',
    g_tk: 5381,
    format: 'json',
    inCharset: 'utf8',
    loginUin: 0,
    data: {"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":param}},
    '-': 'getUCGI25623611785621114'
  });

  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSingerDetail(singerId) {
  const url = '/api/getSingerDetailList'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq.json',
    g_tk: 5381,
    format: 'json',
    inCharset: 'utf8',
    loginUin: 0,
    data: {"comm":{"ct":24,"cv":0},"singer":{"method":"get_singer_detail_info","param":{"sort":5,"singermid":singerId,"sin":0,"num":100},"module":"music.web_singer_info_svr"}},
    '-': 'getUCGI0966630712027079'
  })

  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

