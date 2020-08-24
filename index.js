import {
    StructuredBreadcrumbList,
    FooterInterLink,
    SeoHead,
    Cmap,
    Layer,
    TopTitle,
    Loading,
    Search,
    StructuredFaq,
    NoSearch,
  } from 'components'
  
  import { Invoke, Invoke_3, getRestaurantsList, handlePicUrl, handleSetViewsStorage, getpoiListSearch, Invoke_2 } from 'api'
  
  import React from 'react'
  import ascii from '~ascii'
  import config from '~config'
  import Router from 'next/router'
  import lineClamp from 'line-clamp'
  import objectFitImages from 'object-fit-images'
  
  import {
    ToLineClamp,
    traceLog,
    findInterval,
    replaceAll,
    ReplaceHorizontalLine,
    handleImageError,
    SEOAlternate,
    handlePreventDefault,
    replaceAllLine,
    getCurrentYear,
    getLastItemFromBreadCrumbList,
    getCurrentMonth,
    joinTracePara,
    greenMapScript,
  } from '~utils'
  
  import Poi from './Poi'
  import Ask from './ask'
  import Hotels from './Hotels'
  import Cuisine from './Cuisine' //美食菜系模块
  import HotCities from './HotCities'
  import PhotoList from './PhotoList'
  import Travelogue from './Travelogue'
  import PoiMachine from './PoiMachine'
  import TravelTips from './TravelTips' //旅行贴士模块
  import Restaurants from './Restaurants'
  import GreenMap from './GreenMap/index'
  import TravelWeather from './TravelWeather' //旅行天气模块
  import TopListMobile from './TopListMobile'
  import TopListOnline from './TopListOnline'
  import TopExperience from './TopExperience'
  import RelatedCities from './RelatedCities'
  import TicketsAndTours from './TicketsAndTours'
  import AdvertisementBanner from './AdvertisementBanner'
  import { Title, Mask, MoreButton, TagsStyle, TagStyle } from './Layout'
  import { inject, observer } from 'mobx-react'
  
  @inject('store', 'DestinationDetailStore')
  @observer
  class DestinationDetail extends React.Component {
    static async getInitialProps({ query, req, res, mobxStore }) {
      try {
  
        let cookieStr = ''
        let cookieKeys = Object.keys(req.cookies)
        for (let i = 0; i < cookieKeys.length; i++) {
          cookieStr += `${cookieKeys[i]}=${req.cookies[cookieKeys[i]]}; `
        }
        let locale = mobxStore.locale
        let i18n = mobxStore.i18n
        let breadCrumbListQuery = query.breadCrumbList || []
        let breadListType = breadCrumbListQuery[breadCrumbListQuery.length - 1]?.type || ''
        let isCountryOrProvince = breadListType == 'Country' || breadListType == 'Province'
        /**机翻站点兼容 */
        let _promiseDestination = null
        let _promiseGetSeoCrumbsList = null
        let _promiseInternalLink = null
  
  
        _promiseInternalLink = Invoke({
          //内链
          serviceCode: 18762,
          serviceName: 'internalLink',
          type: 'post',
          params: {
            businessType: isCountryOrProvince ? 3 : 4,
            resourceId: Number.parseInt(query.destinationId),
          },
          store: mobxStore,
        })
        _promiseGetSeoCrumbsList = Invoke({
          //面包屑
          serviceCode: 14966,
          serviceName: 'getContentByIdAndLocale',
          type: 'post',
          params: {
            districtId: parseInt(query.destinationId),
          },
          store: mobxStore,
        })
        _promiseDestination = Invoke({
          serviceCode: 14966,
          serviceName: 'getdestinationinfo',
          type: 'post',
          params: {
            districtId: parseInt(query.destinationId) || 2,
            poiSize: 4, //poi个数
            hotelSize: 4, //酒店个数
            eatsize: 4, //美食产品个数
            productSize: 4, //海玩产品个数
            platformId: 24, //24online
          },
          store: mobxStore,
        })
  
        let [
          WeatherDetail, //天气接口
          foodFilter, //菜系接口
          photoInfoList, //旅拍
          breadCrumbList, //面包屑
          toursListTags, //玩乐tags
          destination, //目的地
          getDistrictArticle, //文章
          internalLink = {}, //内链
          DestTopExperienceRank, //榜单
          supportLocaleList, //目的地页可以支持的语言locale
          getAskList, //问答
          moduleList, // CT打通新接口
        ] = await Promise.all([
          Invoke({
            //面包屑
            serviceCode: 14966,
            serviceName: 'WeatherDetail',
            type: 'post',
            params: {
              districtId: parseInt(query.destinationId),
            },
            store: mobxStore,
          }).catch(err => {
            return {}
          }),
          Invoke({
            //面包屑
            serviceCode: 14966,
            serviceName: 'foodFilter',
            type: 'post',
            params: {
              districtId: parseInt(query.destinationId),
            },
            store: mobxStore,
          }).catch(err => []),
          Invoke({
            //旅拍
            serviceCode: 18066,
            serviceName: 'hotTravelShootForOnline',
            type: 'post',
            params: {
              districtId: parseInt(query.destinationId),
              pageIndex: 1,
              pageSize: 6,
              allImage: true,
              locale: mobxStore.locale,
            },
            store: mobxStore,
          })
            .then(data => {
              return data.resources || []
            })
            .catch(err => []),
          _promiseGetSeoCrumbsList.then(data => data?.contentList || []).catch(err => []),
          Invoke({
            //玩乐顶部切换tags列表
            serviceCode: 14966,
            serviceName: 'productNavication',
            type: 'post',
            params: {
              districtId: parseInt(query.destinationId) || 2,
              platformId: 24,
              networkType: 0,
            },
            store: mobxStore,
          })
            .then(data => {
              return data.results
            })
            .catch(err => {
              console.log(err, 1)
            }),
          _promiseDestination
            .then(data => {
              //为了配合后端获取geocityId 后端返回额外数据 不删除额外数据也许会存在ui bug;
              delete data.destination.hotelMoreUrl
              delete data.destination.hotel
              delete data.destination.apphotelMoreUrl
              return data.destination
            })
            .catch(err => {
              return {}
            }),
          Invoke({
            //目的地页获取文章
            serviceCode: 17419,
            serviceName: 'getArticleWithDistrictID',
            type: 'post',
            params: {
              districtID: Number.parseInt(query.destinationId),
            },
            store: mobxStore,
          }).catch(err => {
            return {}
          }),
          _promiseInternalLink.catch(err => {}),
          Invoke({
            //榜单
            serviceCode: 14966,
            serviceName: 'DestTopExperienceRank',
            type: 'post',
            params: {
              districtId: Number.parseInt(query.destinationId),
            },
            store: mobxStore,
          }).catch(err => {
            return {}
          }),
          Invoke_2({
            serviceCode: 19836,
            serviceName: 'tripdestinationsecondaryservice.getDestLocale',
            store: mobxStore,
            params: {
              districtId: Number.parseInt(query.destinationId),
              destLocaleRange: 'all',
            },
          })
            .then(data => data?.localeList || [])
            .catch(err => []),
          Invoke({
            serviceCode: 18363,
            type: 'post',
            serviceName: 'getAskList',
            params: {
              targetId: Number.parseInt(query.destinationId),
              targetType: 1,
              locale: mobxStore.locale,
              pageIndex: 1,
              pageSize: 6,
            },
            store: mobxStore,
          })
            .then(this.checkData)
            .catch(err => {
              return {}
            }),
            Invoke_3({
              serviceCode: 19836,
              funcName: 'getDestinationPageInfo',
              store: mobxStore,
              cookies: cookieStr,
              params: {
                districtId: query.destinationId,
              },
            })
              .then(res => res.moduleList || [])
              .catch(err => {
                return {}
              }),
        ])
  
  
        let IDtype = (breadCrumbList && breadCrumbList[breadCrumbList.length - 1] && breadCrumbList[breadCrumbList.length - 1].type) || 'null'
  
        toursListTags.unshift({
          navicationId: null,
          navicationName: i18n['key.Ticket_Tour_Top_Attractions'] || 'key.Ticket_Tour_Top_Attractions',
        })
        toursListTags = [...toursListTags.filter((item, index) => item.navicationId != -1)]
        //相关城市信息
        let relateList = []
        //只有在城市时展示相关推荐
        if (IDtype == 'City') {
          for (let i = 0; i < moduleList.length; i++) {
            let item = moduleList[i]
  
            if (item.type == 10) {
              relateList = item?.relateDistrictModel?.districtList || []
            }
          }
        }
        //只有在国家和省时展示热门城市
        let hotCities = []
        let hotCitiesMoreUrl = ''
        if (IDtype != 'City') {
          for (let i = 0; i < moduleList.length; i++) {
            let item = moduleList[i]
  
            if (item.type == 3) {
              hotCities = item?.hotDistrictModule?.districtList || []
              hotCitiesMoreUrl = item?.hotDistrictModule?.moreJumpUrl || ''
            }
          }
        }
  
        let { attractions = [], hotels = [], restaurant = {} } = DestTopExperienceRank
        const ShowTopExperience = attractions.length > 0 ? true : false
  
        // poiTab
        let tagList = [],
          recommendRankModule = null
        let safeTravelModule = null
        let districtType = null
        
        {
          destination.thingsTodo = []
          destination.poiMoreUrl = ''
  
          for (let i = 0; i < moduleList.length; i++) {
            let item = moduleList[i]
            if (item.type == 6) {
              tagList = item?.hotSightModel?.tabList || []
  
              if (tagList.length) {
                destination.thingsTodo = tagList[0]?.sightList || []
                destination.poiMoreUrl = tagList[0]?.moreUrl || ''
              }
            }
  
            if (item.type == 13) {
              let _recommendRankModule = item.recommendRankModule
              let rankList = _recommendRankModule?.rankList || []
              if (rankList.length) {
                recommendRankModule = _recommendRankModule
              }
            }
  
            if (item.type == 1) {
              let coord = item?.headModule?.coord
              districtType = item?.headModule?.districtType
              destination.coverImageId = item?.headModule.imageUrl || ''
              destination.cityName = item?.headModule.districtName
              destination.eats = [
                {
                  gglat: coord.latitude || '',
                  gglon: coord.longitude,
                },
              ]
            }
  
            if (item.type == 14) {
              safeTravelModule = item.safeTravelModule
            }
          }
        }
  
    
  
        return {
          recommendRankModule,
          NumberFormat: req.shark.NumberFormat,
          isCountryOrProvince,
          internalLink,
          WeatherDetail,
          foodFilter,
          photoInfoList,
          getDistrictArticle,
          IDtype,
          hotCities,
          hotCitiesMoreUrl,
          ...query,
          tagList,
          locale,
          i18n,
          ShowTopExperience,
          ...destination,
          relateList: relateList,
          DestTopExperienceRank,
          breadCrumbList,
          toursListTags,
          supportLocaleList,
          getAskList,
          moduleList,
          destination,
          safeTravelModule,
          districtType,
        }
      } catch (error) {
        res.statusCode = 404
        return {
          NotSupport: true,
        }
      }
    }
  
    constructor(props) {
      super(props)
      if (props.NotSupport) {
        this.state = {}
      } else {
        let { i18n = {} } = props.store
  
        this.navref = React.createRef()
        this.state = {
          geoCityId: this.props.geoCityId || this.props.destinationId || 0, //玩乐的cityid
          currencySymbol: this.props.store.currencySymbol || '$',
          TourTagsActiveIndex: 0,
          toursListTags: this.props.toursListTags || [],
          marktingProductDtoList: this.props.marktingProductDtoList ? [...this.props.marktingProductDtoList] : [], // 热门海玩
          tagId: this.props.tagId || null,
          currency: this.props.store.currency,
          activeTagId: null,
          englishName: this.props.englishName,
          photocounts: this.props.photocounts || 0,
          offsetTop: null,
          tagsFilter: null,
          tagsActiveIndex: 0,
          isShowMore: false,
          showMoreActive: false,
          showtext: i18n['key.show_more'] || 'show more',
          visibleMap: false, //是否显示大图map
          lon: this.props.gglon || 121.662397, //经度
          lat: this.props.gglat || 31.141, //纬度
          destinationId: this.props.destinationId || 0,
          breadCrumbList: [...this.props.breadCrumbList],
          cityName: this.props.cityName || null,
          i18n: this.props.store.i18n || {},
          locale: this.props.store.locale || 'en-US',
          language: this.props.store.language,
          description: this.props.description || null,
          visible: false,
          isFixed: false,
          activeTag: 0,
          refContent: [
            {
              name: i18n['key.description'] || 'Description', //简介
              display: true,
            },
            {
              name: i18n['key.Top_city_incountry'] || 'key.Top_city_incountry', //热门城市
              display: this.props.hotCities.length > 0,
            },
            {
              name: i18n['key.top_thing_to_do_btn'] || 'Top Things to Do', //poi 2 ro 4 display
              display: this.props.thingsTodo?.length >= 2 ? true : false,
            },
            {
              name: i18n['key.tickets_and_tours_btn'] || 'Tickets and Tours', //玩乐
              display: this.props.marktingProductDtoList?.length > 0 ? true : false,
            },
            {
              name: i18n['key.related_travelogue'] || 'key.related_travelogue', // 文章
              display: this.props.getDistrictArticle && this.props.getDistrictArticle?.articleSummaries?.length > 0,
            },
            {
              name: i18n['key.des_travel_tips_btn'] || 'key.des_travel_tips_btn', //旅行贴士
              display: this.props.transportation || this.props.experience || Object.keys(this.props?.helpfulInformation || {}).length > 0,
            },
            {
              name: i18n['key.des_weather_btn'] || 'key.des_weather_btn', //天气
              display: this.props?.WeatherDetail?.weatherDetails?.weatherInfos,
            },
            {
              name: i18n['key.travel_experience_btn'] || 'key.travel_experience_btn', // 旅拍
  
              display: this.props.photoInfoList.length > 0,
            },
            {
              name: i18n['key.ask_btn'] || 'key.ask_btn', //问答
              display: this.props?.getAskList?.askList?.length > 1,
            },
            {
              name: i18n['key.What_to_eat_btn'] || 'What to Eat', //美食
              refs: 'Where to Eat',
              display: this.props?.foodFilter?.cuisines?.length,
            },
  
            {
              name: i18n['key.where_to_stay_btn'] || 'Where to Stay', //酒店
              refs: 'Where to Stay',
              display: false,
            },
          ].filter(item => item.display || item.refs == 'Where to Stay'),
          scrollList: [],
          hotel: [],
          relateList: this.props.relateList ? [...this.props.relateList] : [],
          thingsTodo: this.props.thingsTodo ? [...this.props.thingsTodo] : [],
          eats: this.props.eats || [],
          locationsearch: '',
          destinationName: this.props.destinationName,
          coverImageId: this.props.coverImageId || null,
          ThingsToDoTags: this.props.tagList ? [...this.props.tagList] : [], //poi顶部tags
          experienceList: [...'1'.repeat(3)], //游记列表
          travelGuideList: [], //游记
          supportLocaleList: this.props.supportLocaleList || [],
          hotelShowMoreUrl: '',
          getAskList: this.props.getAskList || {},
          isShowMap: true,
          poiMoreUrl: this.props.poiMoreUrl || '',
          hotCitiesMoreUrl: this.props.hotCitiesMoreUrl || '',
        }
      }
    }
  
    selectTourTags = async (item, index) => {
      if (this.state.visible) {
        return
      }
  
      if (index == this.state.TourTagsActiveIndex) {
        return
      }
      if (index == 0) {
        this.setState({
          TourTagsActiveIndex: index,
          marktingProductDtoList: [...this.props.marktingProductDtoList] || [],
        })
        return
      }
      this.setState({
        visible: true,
      })
      let searchResult = await Invoke({
        serviceName: 'productSearch',
        type: 'post',
        params: {
          platformId: 24,
          districtId: Number.parseInt(this.state.destinationId),
          searchParameter: {
            searchType: 1,
            searchKey: '' + item.navicationId,
            // searchKey: "40",
            sortType: 0,
          },
          pageIndex: 1,
          pageSize: 6,
        },
        store: this.props.store,
      })
        .then(data => {
          return data.results
        })
        .catch(err => {
          return []
        })
      if (searchResult.length > 0) {
        this.setState(
          {
            TourTagsActiveIndex: index,
            visible: false,
            marktingProductDtoList: [...searchResult],
          },
          () => {
            this.startScroll()
          }
        )
      } else {
        setTimeout(() => {
          this.setState({
            visible: false,
          })
        }, 2000)
      }
    }
  
    // 机翻页面 热门景点tab切换
    selectTagsMachine = async (item, index) => {
      if (this.state.visible) {
        return
      }
      if (index == this.state.tagsActiveIndex) {
        return
      }
      this.setState({
        visible: true,
      })
      let { locale, destinationId } = this.state
      let list = null
      if (item.tagId) {
        list = [parseInt(item.tagId)]
      }
      let result
      try {
        result = await getpoiListSearch(locale, parseInt(destinationId, 10), 1, 4, 'String', list).catch(err => {
          return { view: [] }
        })
        if (result.view.length > 0) {
          this.setState(
            {
              visible: false,
              thingsTodo: [...result.view],
              tagsActiveIndex: index,
              activeTagId: item.tagId,
            },
            () => {
              this.startScroll()
              ToLineClamp()
            }
          )
        } else {
          this.setState({
            visible: false,
          })
        }
      } catch (error) {
        this.setState(
          {
            visible: false,
          },
          () => {
            this.startScroll()
            ToLineClamp()
          }
        )
      }
  
      setTimeout(() => {
        if (this.state.visible) {
          this.setState({
            visible: false,
          })
        }
      }, 5000)
    }
  
    // 非机翻页面 热门景点tab切换
    async selectTags(item, index) {
      if (this.state.visible) {
        return
      }
      if (index == this.state.tagsActiveIndex) {
        return
      }
      this.setState({
        visible: true,
      })
  
      let result
      try {
        result = await Invoke_3({
          serviceCode: 19913,
          funcName: 'getSightList',
          store: this.props.store,
          params: {
            districtID: this.state.destinationId,
            filter: {
              themeFilter: {
                tagIdList: [item.type],
              },
            },
          },
        }).catch(err => {
          return { sightList: [] }
        })
  
        if (result.sightList.length > 0) {
          this.setState(
            {
              visible: false,
              thingsTodo: [...result.sightList],
              tagsActiveIndex: index,
              poiMoreUrl: item.moreUrl,
            },
            () => {
              this.startScroll()
              ToLineClamp()
            }
          )
        } else {
          this.setState({
            visible: false,
          })
        }
      } catch (error) {
        this.setState(
          {
            visible: false,
          },
          () => {
            this.startScroll()
            ToLineClamp()
          }
        )
      }
  
      setTimeout(() => {
        if (this.state.visible) {
          this.setState({
            visible: false,
          })
        }
      }, 5000)
    }
  
    //地图相关方法
    handleMapClick = () => {
      this.setState({ visibleMap: true })
    }
  
    //渲染大地图
    renderMap = () => {
      const { i18n, locale, lon, lat, cityName } = this.state
      return this.state.visibleMap ? (
        <Cmap
          i18n={i18n}
          locale={locale}
          cpoint={[lon, lat]}
          title={cityName}
          level={String(this.props.IDtype).toLocaleLowerCase()}
          whitchTabsActive={2}
          subTitle={[
            i18n['key.transpotation'] || 'Airport and Railway Station',
            i18n['key.metro'] || 'Nearby Metro',
            (i18n['key.things_to_do'] || 'key.things_to_do').replace('%1$s', cityName || 'city'),
            replaceAll(i18n['key.xxx_in_restaurants'], cityName) || cityName + ' Restaurant',
          ]} // 外部传入方法
          customItemClick={this.customItemClick}
          getCustomData={[this.getPoiListMap, this.getEatListMap]}
          handleMapClose={this.handleMapClose}
          destinationId={this.state.destinationId}
          pageCode={10650006152}
        />
      ) : null
    }
    customItemClick = (item, current_tab) => {
      let { destinationId, destinationName, locationsearch } = this.state
      this.setState({
        visible: true,
      })
      //景点
      if (current_tab == 2) {
        traceLog({
          pagecode: 10650006152,
          params: {
            destination_id: destinationId,
            module_name: 'poi',
            module_click_index: 2,
            module_click_name: item.name,
          },
        })
        location.href = `${config.prefix}/${ReplaceHorizontalLine(destinationName)}/${ReplaceHorizontalLine(item.englishName || item.name)}-${item.poiId}${locationsearch}`
      }
      //美食
      if (current_tab == 3) {
        traceLog({
          pagecode: 10650006152,
          params: {
            destination_id: destinationId,
            module_name: 'food',
            module_click_index: 2,
            module_click_name: item.name,
          },
        })
        location.href = `${config.prefix}/${ReplaceHorizontalLine(destinationName)}-${destinationId}-restaurant/${ReplaceHorizontalLine(item.englishName || item.poiName)}-${item.poiId}${locationsearch}`
      }
    }
    getPoiListMap = async (currentPage = 1) => {
      const { locale, destinationId } = this.state
      let result = await getpoiListSearch(locale, parseInt(destinationId, 10), currentPage)
      return { list: result.view ? result.view : null, total: result.total ? result.total : null }
    }
    getEatListMap = async (currentPage = 1) => {
      const { locale, destinationId } = this.state
      return getRestaurantsList(
        {
          method: 'post',
          districtId: destinationId,
          pageIndex: currentPage,
          pageSize: 10,
        },
        this.props.store
      ).then(data => {
        return {
          list: data.results,
          total: data.total,
        }
      })
    }
    getCustomData = async (current_tab, currentPage = 1, range = 5000) => {
      const { locale, destinationId } = this.state
      if (current_tab == 2) {
        let result = await getpoiListSearch(locale, parseInt(destinationId, 10), currentPage)
        return { list: result.view ? result.view : null, total: result.total ? result.total : null }
      }
      if (current_tab == 3) {
        return getRestaurantsList(
          {
            method: 'post',
            districtId: destinationId,
            pageIndex: currentPage,
            pageSize: 10,
          },
          this.props.store
        ).then(data => {
          return {
            list: data.results,
            total: data.total,
          }
        })
      }
    }
    handleMapClose = () => {
      this.setState({ visibleMap: false })
    }
    InitScroll(length, first = false) {
      return [...'1'.repeat(length)]
        .map((item, index) => {
          let offsetTop = 0
          try {
            offsetTop = this.refs[index] && this.refs[index].offsetTop
          } catch (e) {
            console.log(e)
          }
  
          return offsetTop - 12 - 46
  
          return 0
        })
        .map((item, index) => {
          if (first) {
            if (index != 0) {
              return item
            }
            return item
          }
  
          return item
        })
        .filter(item => item > 0)
    }
  
    handleRouteChangeComplete = url => {
      let { i18n = {} } = this.props.store
      this.props.DestinationDetailStore.getBanner({ store: this.props.store, id: this.props.destinationId })
      objectFitImages()
      this.setState({
        geoCityId: this.props.geoCityId || this.props.destinationId || 0, //玩乐的cityid
        currencySymbol: this.props.store.currencySymbol || '$',
        TourTagsActiveIndex: 0,
        toursListTags: this.props.toursListTags || [],
        marktingProductDtoList: this.props.marktingProductDtoList ? [...this.props.marktingProductDtoList] : [], // 热门海玩
        tagId: this.props.tagId || null,
        currency: this.props.store.currency,
        activeTagId: null,
        englishName: this.props.englishName,
        photocounts: this.props.photocounts || 0,
        offsetTop: null,
        tagsFilter: null,
        tagsActiveIndex: 0,
        isShowMore: false,
        showMoreActive: false,
        showtext: this.props.store.i18n['key.show_more'] || 'show more',
        visibleMap: false, //是否显示大图map
        lon: this.props.gglon || 121.662397, //经度
        lat: this.props.gglat || 31.141, //纬度
        destinationId: this.props.destinationId || 0,
        breadCrumbList: [...this.props.breadCrumbList],
        cityName: this.props.cityName || null,
        i18n: this.props.store.i18n || {},
        locale: this.props.store.locale || 'en-US',
        language: this.props.store.language,
        description: this.props.description || null,
        visible: false,
        isFixed: false,
        activeTag: 0,
        refContent: [
          {
            name: i18n['key.description'] || 'Description', //简介
            display: true,
          },
          {
            name: i18n['key.Top_city_incountry'] || 'key.Top_city_incountry', //热门城市
            display: this.props.hotCities.length > 0,
          },
          {
            name: i18n['key.top_thing_to_do_btn'] || 'Top Things to Do', //poi 2 ro 4 display
            display: this.props.thingsTodo?.length >= 2 ? true : false,
          },
          {
            name: i18n['key.tickets_and_tours_btn'] || 'Tickets and Tours', //玩乐
            display: this.props.marktingProductDtoList?.length > 0 ? true : false,
          },
          {
            name: i18n['key.related_travelogue'] || 'key.related_travelogue', // 文章
            display: this.props.getDistrictArticle && this.props.getDistrictArticle?.articleSummaries?.length > 0,
          },
          {
            name: i18n['key.des_travel_tips_btn'] || 'key.des_travel_tips_btn', //旅行贴士
            display: this.props.transportation || this.props.experience || Object.keys(this.props?.helpfulInformation || {}).length > 0,
          },
          {
            name: i18n['key.des_weather_btn'] || 'key.des_weather_btn', //天气
            display: this.props?.WeatherDetail?.weatherDetails?.weatherInfos,
          },
  
          {
            name: i18n['key.travel_experience_btn'] || 'key.travel_experience_btn', //旅拍
  
            display: this.props.photoInfoList.length > 0,
          },
          {
            name: i18n['key.ask_btn'] || 'key.ask_btn', //问答
            display: this.props?.getAskList?.askList?.length > 1,
          },
          {
            name: i18n['key.What_to_eat_btn'] || 'What to Eat', //美食
            refs: 'Where to Eat',
            display: this.props?.foodFilter?.cuisines?.length,
          },
  
          {
            name: i18n['key.where_to_stay_btn'] || 'Where to Stay', //酒店
            refs: 'Where to Stay',
            display: false,
          },
        ].filter(item => item.display || item.refs == 'Where to Stay'),
        scrollList: [],
        hotel: this.props.hotel ? [...this.props.hotel] : [],
        relateList: this.props.relateList ? [...this.props.relateList] : [],
        thingsTodo: this.props.thingsTodo ? [...this.props.thingsTodo] : [],
        eats: this.props.eats || [],
        locationsearch: '',
        destinationName: this.props.destinationName,
        coverImageId: this.props.coverImageId || null,
        ThingsToDoTags: this.props.tagList ? [...this.props.tagList] : [],
        experienceList: [...'1'.repeat(3)], //游记列表
        travelGuideList: [], //游记
        banner: {},
        poiMoreUrl: this.props.poiMoreUrl,
      })
      $(window)?.unbind('scroll', this.onScroll?.bind(this))
      window.DestinationInitMap = null
      this.FirstTracelog() //进入页面的埋点
      Cmap.init({
        level: String(this.props.IDtype).toLocaleLowerCase(),
        list:
          this.props.eats.length > 0
            ? this.props.eats.map(item => {
                return {
                  lat: item.gglat || this.state.lat,
                  lon: item.gglon || this.state.lon,
                }
              })
            : [{ lat: this.props.gglat, lon: this.props.gglon }],
        locale: this.props.store.locale,
        target: document.getElementById('gl-destination-detail_map'),
      })
      if (this.refs.about && this.refs.about.offsetHeight > 54) {
        this.setState({ isShowMore: true, showMoreActive: true })
      }
      this.setState({
        locationsearch: window.location.search,
      })
      handleSetViewsStorage({
        englishName: this.props.englishName,
        name: this.props.cityName,
        coverImage: this.props.coverImageId,
        districtId: this.props.destinationId,
      })
      setTimeout(() => {
        this.startScroll(true)
      }, 1000)
      this.state.hotel.forEach((item, index) => {
        this.refs[`where-to-stay-${index}`] && lineClamp(this.refs[`where-to-stay-${index}`], 2)
      })
    }
    componentDidMount() {
      const { platform = '' } = this.props.store
      this.initTrace()
  
      if (this.props.NotSupport) {
        return
      }
      //client router update
      Router.events.on('routeChangeComplete', this.handleRouteChangeComplete)
      this.getHotelBannerItem()
      objectFitImages()
      const { locale, lon, lat, eats } = this.state
      this.FirstTracelog() //进入页面的埋点
      const clientWidth = $(document.body).width() || '1024'
      if (!(platform == 'H5' || platform == 'IPad') || clientWidth > 768) {
        Cmap.init({
          level: String(this.props.IDtype).toLocaleLowerCase(),
          list:
            eats.length > 0
              ? eats.map(item => {
                  return {
                    lat: item.gglat || this.state.lat,
                    lon: item.gglon || this.state.lon,
                  }
                })
              : [{ lat: this.state.lat, lon: this.state.lon }],
          locale: locale,
          target: document.getElementById('gl-destination-detail_map'),
        })
      } else {
        this.setState({
          isShowMap: false,
        })
      }
      if (this.refs.about && this.refs.about.offsetHeight > 54) {
        this.setState({ isShowMore: true, showMoreActive: true })
      }
      this.setState({
        locationsearch: window.location.search,
      })
      handleSetViewsStorage({
        englishName: this.props.englishName,
        name: this.props.cityName,
        coverImage: this.props.coverImageId,
        districtId: this.props.destinationId,
      })
  
      this.setState({
        offsetTop: (this.navref && this.navref.current && this.navref.current.offsetTop) || 0,
      })
      //
      setTimeout(() => {
        this.startScroll(true)
      }, 1000)
      this.state.hotel.forEach((item, index) => {
        this.refs[`where-to-stay-${index}`] && lineClamp(this.refs[`where-to-stay-${index}`], 2)
      })
    }
    getHotelBannerItem = async () => {
      let { destinationId } = this.state
      let { moduleList } = this.props
      let hotel = []
      let hotelShowMoreUrl = ''
  
      for (let i = 0; i < moduleList.length; i++) {
        let item = moduleList[i]
  
        if (item.type == 11) {
          hotel = item.hotHotelModule?.hotelList || []
          hotelShowMoreUrl = item.hotHotelModule?.moreJumpUrl || ''
        }
      }
  
      let banner = await Invoke({
        serviceCode: 14966,
        serviceName: 'getBanner',
        params: {
          districtId: Number(destinationId),
        },
        store: this.props.store,
      })
        .then(data => {
          return data
        })
        .catch(e => {
          return {}
        })
  
      let { refContent } = this.state
      if (hotel && hotel.length) {
        refContent = refContent.map((item, index) => {
          if (item.refs == 'Where to Stay') {
            item.display = true
          }
          return item
        })
        this.setState({
          hotelShowMoreUrl: hotelShowMoreUrl,
          hotel: hotel,
          refContent: refContent,
          banner,
        })
      } else {
        refContent = refContent.filter(item => item.display)
        this.setState({
          refContent: refContent,
          banner,
        })
      }
    }
    startScroll = first => {
      $(window)?.unbind()
      //初始化顶部滚动
      let arr = this.InitScroll(11, first)
  
      this.setState({ scrollList: [...arr] })
      $(window) && $(window)?.bind('scroll', this.onScroll.bind(this, this?.navref?.current?.offsetTop))
    }
    componentWillUnmount() {
      if (this.props.NotSupport) {
        return
      }
      // console.log('销毁阶段')
      $(window).unbind('scroll', this.onScroll)
      this.isScroll = true
      Router.events.off('routeChangeComplete', this.handleRouteChangeComplete)
    }
    showMoreClick = () => {
      this.setState({
        showMoreActive: !this.state.showMoreActive,
      })
    }
    onScroll(offsetTop) {
      if (!this.isScroll) {
        if (offsetTop == 0) {
          return
        }
  
        let activeTag = this.state.activeTag
        activeTag = findInterval(this.state.scrollList, window.pageYOffset || document.documentElement.scrollTop || window.document.body.scrollTop || document.body.scrollTop)
        const scrollTopNum = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.setState({
          isFixed: scrollTopNum >= offsetTop,
          activeTag,
        })
      }
    }
    changeActiveTag = index => {
      const { judgeExposureWhenNoScroll } = this.props
      this.setState({
        activeTag: index,
      })
      $(window).scrollTop(this.state.scrollList[index] + 1)
      judgeExposureWhenNoScroll()
    }
    FirstTracelog() {
      window['__bfi'].push(['_tracklog', '102358', `destation_id=${this.state.destinationId}`])
    }
    tracelog(module_order, module_name, module_click_order, module_click_name) {
      window['__bfi'].push([
        '_tracklog',
        '102358',
        `destation_id=${this.state.destinationId}&module_order=${module_order}&module_name=${module_name}&module_click_order=${module_click_order}&module_click_name=${module_click_name}`,
      ])
    }
    traceLog2 = ({ keyId, params }) => {
      const { destinationId, pagecode, locale } = this.state
      traceLog({
        pagecode,
        params: {
          districtid: destinationId,
          locale,
          ...params,
        },
        pagekey: keyId,
      })
    }
    joinTracePara = (para = {}) => {
      const { destinationId, locale } = this.state
      return joinTracePara({
        districtid: destinationId,
        locale,
        ...para,
      })
    }
    initTrace = () => {
      // 公共头部点击埋点
      const tabClickTrace = Array.from(document.querySelectorAll('.mc-hd__nav-item .mc-hd__nav-lnk'))
      tabClickTrace?.forEach(trace => {
        // 示例 header_action_nav_hotels
        const idSplitted = trace.id.split('_')
        const tabName = idSplitted[idSplitted.length - 1]
        trace.addEventListener('click', e => {
          this.traceLog2({ keyId: 133535, params: { tabname: tabName } })
        })
      })
      // 公共部分搜索框点击
      document.querySelector('.gl-cpt-search_input>input')?.addEventListener('focus', () => {
        this.traceLog2({ keyId: 133536 })
      })
      // 轮播查看所有图片点击
      document.querySelector('.carousel-amount')?.addEventListener('click', () => {
        this.traceLog2({ keyId: 133577 })
      })
      // 旅拍模块切换
      document.querySelectorAll('.travelogue .trip-moments .nav-arrow')?.forEach(item => {
        item.addEventListener('click', () => this.traceLog2({ keyId: 133558 }))
      })
    }
    render() {
      let className = 'gl-DestinationDetail'
      let { host = '', i18n = {}, useragent } = this.props.store
  
      if (this.props.NotSupport) {
        return <NoSearch i18n={i18n} type="wrong" />
      }
      let {
        geoCityId,
        TourTagsActiveIndex,
        toursListTags,
        marktingProductDtoList,
        englishName,
        visible,
        tagsActiveIndex,
        ThingsToDoTags,
        showMoreActive,
        cityName,
        locale,
        isShowMore,
        destinationId,
        supportLocaleList = [],
        hotelShowMoreUrl = '',
        getAskList = {},
      } = this.state
      let weather = this.props?.weather || {}
      let { internalLink = {}, safeTravelModule } = this.props
      let lastTwoBreadCrumbListItem = getLastItemFromBreadCrumbList(this.props.breadCrumbList, 2) || {}
      let officialAsk = (getAskList && getAskList.askList && getAskList.askList.filter(item => item.official)) || []
      let gmScript = {
        name: replaceAllLine(i18n['key.destintaion.gmp.announcement'], [cityName]),
        text: `<li><h2>${i18n['key.destintaion.gmp.notice']}</h2><p>${i18n['key.destintaion.gmp.epidemic.policy']}<em><a href="${host}/travel-restrictions-covid-19/" target="_blank">「${
          i18n['key.view_more']
        }」</a></em></p></li>`,
        announcementLocation: {
          name: cityName,
          url: `${host}/travel-guide/${ReplaceHorizontalLine(englishName)}-${destinationId}/`,
        },
      }
  
      return (
        <>
          <div className={`${className}`}>
            <SeoHead
              mode="custom"
              title={replaceAllLine(i18n['key.destination_detail_title'] || 'key.destination_detail_title', [getCurrentYear(), cityName, lastTwoBreadCrumbListItem.content])}
              description={replaceAllLine(i18n['key.destination_detail_des'] || 'key.destination_detail_des', [getCurrentYear(), cityName, lastTwoBreadCrumbListItem.content, getCurrentMonth()])}
              keywords={replaceAllLine(i18n['key.district_detail_meta_keywords'] || 'key.district_detail_meta_keywords', [getCurrentYear(), cityName, lastTwoBreadCrumbListItem.content])}
              amphtml={`${host}/m/travel-guide/${ReplaceHorizontalLine(englishName)}-${destinationId}/`}
              alternate={`${host}/m/travel-guide/${ReplaceHorizontalLine(englishName)}-${destinationId}/`}
              shareImage={this.state.coverImageId}
              theCanonical={`${host}/travel-guide/${ReplaceHorizontalLine(englishName)}-${destinationId}/`}
              otherRender={SEOAlternate(supportLocaleList, `/${ReplaceHorizontalLine(englishName)}-${destinationId}/`, locale)}>
              <StructuredBreadcrumbList store={this.props.store} breadCrumbList={this.props.breadCrumbList} />
              {officialAsk && officialAsk.length > 0 ? <StructuredFaq list={officialAsk} /> : null}
              {greenMapScript(locale, gmScript.name, gmScript.text, gmScript.announcementLocation, host)}
            </SeoHead>
            <input type="hidden" id="page_id" value="10650006152" />
            <div className="breadcrumb-search">
              <TopTitle  marginLeft={10} type="small" list={this.props.breadCrumbList} districtid={this.props.destinationId} popularType="attractions" />
            </div>
  
            <h1 className={`${className}_title`}>{cityName || null}</h1>
            {/* 绿地图 */}
            { safeTravelModule && <GreenMap host={host} module={safeTravelModule} destinationId={destinationId} districtType={this.props.districtType}></GreenMap>}
            <div className={!this.state.isFixed ? `${className}_top-nav-container` : `${className}_top-nav-container-fixed`} ref={this.navref}>
              <ul role="menu" className={`${className}_top-nav`}>
                {this.state.refContent.map((item, index) => {
                  return (
                    item.display && (
                      <li
                        role="button"
                        tabIndex={index}
                        key={index}
                        data-ubt-vars-traceid={133541}
                        data-ubt-vars-cpt={this.joinTracePara({ tabname: item.name })}
                        className={this.state.activeTag == index ? `${className}_top-nav-li active` : `${className}_top-nav-li`}
                        onClick={() => this.changeActiveTag(index)}>
                        <p>{item.name}</p>
                      </li>
                    )
                  )
                })}
              </ul>
              <div className="search-warp">
                <Search districtid={this.props.destinationId} type="small" popularType="attractions" />
              </div>
            </div>
            <div
              className="photos-show-container"
              style={{
                marginTop: !this.state.isFixed ? '12px' : '76px',
              }}
              //第一个tab
              ref={0}>
              <div className={`${className}_photos-show`}>
                <div className={`${className}_photos-show-photo`} data-destination-id={this.props.debug && this.props.debug == 'true' ? this.props.destinationId : ''}>
                  <div className="weather-small">
                    <div className="weather-icon" style={{ backgroundImage: `url(${weather?.iconUrl})` }}></div>
                    <span>
                      {weather?.temperatureRange?.[0]} - {weather?.temperatureRange?.[1]} {ascii.Celsius}
                    </span>
                  </div>
                  <img
                    onError={event => {
                      event.target.style.width = '100%'
                      handleImageError(event)
                    }}
                    src={ this.state.coverImageId }
                    alt={cityName}
                  />
  
                  {this.state.thingsTodo.length > 0 && this.state.photocounts > 0 && (
                    <a
                      data-ubt-vars-traceid={133544}
                      data-ubt-vars-cpt={this.joinTracePara()}
                      title={`${replaceAll(i18n['key.photos_of_XXX'], cityName)}`}
                      href={`${config.prefix}/${ReplaceHorizontalLine(englishName || cityName || this.state.breadCrumbList[this.state.breadCrumbList.length - 1].content)}-${
                        this.props.destinationId
                      }/tourist-attractions-photo/`}
                      target="_self">
                      { <div className={`${className}_photos-show-photo-tips`}>{replaceAll(i18n['key.show_all_photos_XXX'], this.state.photocounts)}</div> }
                    </a>
                  )}
                </div>
                <div className={`${className}_photos-show-context`}>
                  <h2 className={`${className}_photos-show-context-title`} data-destination-id={this.props.debug && this.props.debug == 'true' ? this.props.destinationId : ''}>
                    {i18n['key.View_Attractions_on_Map'] || 'View Attractions on Map'}
                  </h2>
                  <div className={`${className}_photos-show-context-paragraph-container`}>
                    <div role="button" tabIndex="0" className={'gl-destination-detail_map'} style={{ height: '243px', background: 'rgba(228,228,228)' }}>
                      <div id={'gl-destination-detail_map'} />
                      {this.state.isShowMap ? (
                        <span
                          data-ubt-vars-traceid={133546}
                          data-ubt-vars-cpt={this.joinTracePara()}
                          onClick={this.handleMapClick}
                          className={'btn blue_btn gl-poi-detail_show-map'}
                          style={{ bottom: 0, right: 0 }}>
                          {i18n['key.view_on_map'] || 'View on map'}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              {this.state.description && (
                <div className="about">
                  <h2 className="title" style={{ fontWeight: '700' }}>
                    {replaceAll(i18n['key.get_to_know_XXX'], cityName || this.state.breadCrumbList[this.state.breadCrumbList.length - 1].content)}
                  </h2>
                  <div
                    className={`content ${showMoreActive ? 'content-more' : ''}`}
                    ref="about"
                    dangerouslySetInnerHTML={{
                      __html: this.state.description || i18n[`key.noabout`],
                    }}>
                    {/* {this.state.description || i18n[`key.noabout`]} */}
                  </div>
                  {isShowMore ? (
                    <div role="button" tabIndex="0" className="show-more" onClick={() => this.showMoreClick()}>
                      <span className={`${showMoreActive ? 'more' : 'less'} text`}>
                        {showMoreActive ? i18n['key.show_more'] : i18n['key.show_less']}
                        <i className={`${showMoreActive ? 'down' : 'up'}`} />
                      </span>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            {/* 榜单 S12被下掉 */}
            {false && this.props.ShowTopExperience && (
              <div className="experience" ref={1}>
                <TopExperience
                  cityName={this.props.cityName}
                  IDtype={this.props.IDtype}
                  order={1}
                  DestTopExperienceRank={this.props.DestTopExperienceRank}
                  englishName={ReplaceHorizontalLine(englishName || this.state.cityName)}
                  destinationId={this.props.destinationId}
                />
              </div>
            )}
            {/* 热门城市 */}
            {this.props.hotCities.length > 0 && (
              <div ref={1}>
                <HotCities
                  order={1}
                  cityName={this.props.cityName}
                  hotCities={this.props.hotCities}
                  englishName={ReplaceHorizontalLine(englishName || this.state.cityName)}
                  destinationId={this.props.destinationId}
                  activeTagId={this.state.activeTagId}
                  moreUrl={this.state.hotCitiesMoreUrl}
                />
              </div>
            )}
  
            {/* top景点 非机翻页面展示 */}
            {this.state.thingsTodo.length >= 2 && (
              <React.Fragment>
                <div className={`${className}_top-travel-guide burited_point`} ref={2} data-exposure-traceid={133548} data-exposure-content={this.joinTracePara()}>
                  <Title>{replaceAll(i18n['key.top_thing_to_do'], this.props.cityName)}</Title>
                  { ThingsToDoTags.length > 1 && (
                    <TagsStyle>
                      {ThingsToDoTags.map((item, index) => {
                        return (
                          <TagStyle
                            role="button"
                            tabIndex={index}
                            data-ubt-vars-traceid={133550}
                            data-ubt-vars-cpt={this.joinTracePara({ tabname: item.name })}
                            onClick={() => this.selectTags(item, index)}
                            className={`tag ${tagsActiveIndex == index ? 'active' : ''}`}
                            key={index}>
                            <a
                              onClick={e => handlePreventDefault(e)}
                              href={item.moreUrl}
                              title={(i18n['key.des_poi_tab'] || 'key.des_poi_tab').replace('%1$s', this.props.cityName).replace('%2$s', item.name)}>
                              {item.name}
                            </a>
                          </TagStyle>
                        )
                      })}
                    </TagsStyle>
                  )}
                  <Poi
                    order={2}
                    cityName={this.props.cityName}
                    joinTracePara={this.joinTracePara}
                    englishName={ReplaceHorizontalLine(englishName || this.state.cityName)}
                    destinationId={this.props.destinationId}
                    thingsTodo={this.state.thingsTodo}
                    activeTagId={this.state.activeTagId}
                    moreUrl={this.state.poiMoreUrl}
                  />
                </div>
              </React.Fragment>
            )}
            {!!this.props.recommendRankModule && (
              <Title
                className="burited_point"
                data-exposure-content={`districtId=${this.props.destinationId}&districtType=${this.props.districtType}&actioncode=tgs_dstdetail_expo_listtopic_card`}
                data-exposure-traceid="138901">
                {replaceAll(i18n['key.destination.topicslist'], this.props.cityName)}
              </Title>
            )}
            {!!this.props.recommendRankModule && useragent.isMobile ? (
              <TopListMobile districtType={this.props.districtType} districtId={this.props.destinationId} recommendRankModule={this.props.recommendRankModule}></TopListMobile>
            ) : (
              <TopListOnline districtType={this.props.districtType} districtId={this.props.destinationId} recommendRankModule={this.props.recommendRankModule}></TopListOnline>
            )}
  
            {/* 门票景玩 s12需求 放在第三个  */}
            { marktingProductDtoList.length > 0 && (
              <div className={`${className}_Tickets-and-tours burited_point`} ref={3} data-exposure-traceid={133553} data-exposure-content={this.joinTracePara()}>
                <Title>{replaceAll(i18n['key.tickets_and_tours'], this.props.cityName)}</Title>
  
                {toursListTags.length > 0 && (
                  <TagsStyle>
                    {toursListTags.map((item, index) => {
                      return (
                        <TagStyle
                          data-ubt-vars-traceid={133554}
                          data-ubt-vars-cpt={joinTracePara({ tabname: item.navicationName })}
                          role="button"
                          tabIndex={index}
                          onClick={() => {
                            this.selectTourTags(item, index)
                          }}
                          className={`${TourTagsActiveIndex == index ? 'active' : ''}`}
                          key={index}>
                          {item.navicationName}
                        </TagStyle>
                      )
                    })}
                  </TagsStyle>
                )}
  
                <TicketsAndTours
                  order={3}
                  cityName={this.props.cityName}
                  destinationId={destinationId}
                  englishName={englishName}
                  searchname={ReplaceHorizontalLine(this.state.englishName || 'city')}
                  marktingProductDtoList={marktingProductDtoList}
                  joinTracePara={this.joinTracePara}
                  geoCityId={geoCityId}
                  NumberFormat={this.props.NumberFormat}
                />
              </div>
            )}
  
            {/** 文章 */}
            {this.props.getDistrictArticle && this.props.getDistrictArticle?.articleSummaries?.length > 0 && (
              <div className="burited_point" ref={4} data-exposure-traceid={133562} data-exposure-content={this.joinTracePara()}>
                <Travelogue
                  order={6}
                  cityName={this.props.cityName}
                  getDistrictArticle={this.props.getDistrictArticle}
                  englishName={ReplaceHorizontalLine(englishName || this.state.cityName)}
                  destinationId={this.props.destinationId}
                  joinTracePara={this.joinTracePara}
                  activeTagId={this.state.activeTagId}
                />
              </div>
            )}
  
            {/* 旅行贴士模块 s12新增 第四个模块 */}
            {(this.props.transportation || this.props.experience || Object.keys(this.props?.helpfulInformation || {}).length > 0) && (
              <div className="travel-tips" ref={5}>
                <TravelTips {...this.props} order={4} destinationId={this.props.destinationId} cityName={this.props.cityName} englishName={englishName} />
              </div>
            )}
            {/* 旅行天气模块 s12新增 第五个模块 TODO */}
            {this.props?.WeatherDetail?.weatherDetails?.weatherInfos && (
              <div className="travel-weathers" ref={6}>
                <TravelWeather {...this.props} order={5} destinationId={this.props.destinationId} cityName={this.props.cityName} englishName={englishName} />
              </div>
            )}
            {/* 旅行攻略模块： 整合了旅拍和文章两个模块 */}
            {/* 照片墙 */}
            { this.props.photoInfoList.length > 0 && (
              <div className={'travelogue burited_point'} ref={7} data-exposure-traceid={133557} data-exposure-content={this.joinTracePara()}>
                <PhotoList
                  order={10}
                  cityEnglishName={ReplaceHorizontalLine(englishName || this.state.cityName)}
                  cityid={this.props.destinationId}
                  cityName={this.props.cityName}
                  joinTracePara={this.joinTracePara}
                  photoInfoList={this.props.photoInfoList}
                />
              </div>
            )}
  
            {/* banner*/}
            <AdvertisementBanner banner={this.state.banner || {}} destinationId={destinationId} />
            {/* 问答模块 */}
            { getAskList && getAskList.askList && getAskList.askList.length > 1 ? (
              <div className="burited_point" ref={8} data-exposure-traceid={133565} data-exposure-content={this.joinTracePara()}>
                <Ask
                  order={9}
                  locationId={this.props.destinationId}
                  title={i18n['key.des_qa'] || 'key.des_qa'}
                  moreUrl={`${host}${config.prefix}/faq-des/${ReplaceHorizontalLine(englishName)}-${this.props.destinationId}/`}
                  moreName={replaceAll(i18n['key.des_more_questions'], this.props.cityName)}
                  list={(getAskList && getAskList.askList) || []}
                  joinTracePara={this.joinTracePara}
                />
              </div>
            ) : null}
  
            {/* 美食模块S12下掉 增加美食菜系模块 */}
            {false && this.state.eats.length > 0 && (
              <div className={`${className}_top-travel-guide models`}>
                <Restaurants cityName={this.props.cityName} order={6} destinationId={destinationId} englishName={englishName} eats={this.props.eats} />
              </div>
            )}
            {/* 美食菜系模块 */}
            {this.props?.foodFilter?.cuisines?.length ? (
              <div className={`${className}_top-travel-guide models burited_point`} ref={9} data-exposure-traceid={133568} data-exposure-content={this.joinTracePara()}>
                <Cuisine
                  DestTopExperienceRank={this.props.DestTopExperienceRank}
                  cityName={this.props.cityName}
                  foodFilter={this.props?.foodFilter}
                  order={7}
                  destinationId={destinationId}
                  englishName={englishName}
                  joinTracePara={this.joinTracePara}
                />
              </div>
            ) : null}
  
            {/* 酒店 */}
            {this.state.hotel.length > 0 && (
              <div className={`${className}_where-to-stay models burited_point`} ref={10} data-exposure-traceid={133571} data-exposure-content={this.joinTracePara()}>
                <Hotels
                  cityName={this.props.cityName}
                  order={8}
                  hotelMoreUrl={hotelShowMoreUrl}
                  destinationId={destinationId}
                  englishName={englishName}
                  hotel={this.state.hotel}
                  joinTracePara={this.joinTracePara}
                />
              </div>
            )}
  
            {/* 相关城市 S12需求 该模块显示但不显示tab */}
            {this.props.IDtype == 'City' && this.state.relateList.length > 0 && (
              <div className={`${className}_Related models burited_point`} ref={11} data-exposure-traceid={133574} data-exposure-content={this.joinTracePara()}>
                <RelatedCities joinTracePara={this.joinTracePara} cityName={this.props.cityName} order={11} destinationId={destinationId} relateList={this.props.relateList} />
              </div>
            )}
          </div>
          <FooterInterLink internalLink={internalLink} />
          <Loading i18n={i18n} visible={visible} />
          <Layer visible={this.state.visibleMap} children={this.renderMap()} />
        </>
      )
    }
  }
  export default DestinationDetail
  