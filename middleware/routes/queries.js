const express = require('express')
const axios  = require("axios")
const { response } = require('express')

// const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// router.use(requireAuth)

router.post('/comingSoon', async (req, res) => {
  let url = process.env.BACKEND_URL + 'comingSoon'
  const response = await axios({
    url : url,
    method: 'POST',
    headers: { "Content-Type": 'application/json' },
    data: {
      "region" : req.body.region,
      "type" : req.body.type
    }
  });
  const data = response.data.movies
  // console.log(data)
  console.log("sending comingSoon data")
  return res.status(200).json( data )
})
router.post('/showNews', async (req, res) => {
  let url = process.env.BACKEND_URL + 'showNews'
  const response = await axios({
    url : url,
    method: 'POST',
    headers: { "Content-Type": 'application/json' },
  });
  const data = response.data.news
  console.log("sending news data")
  return res.status(200).json( data )
})

router.post('/recentlyViewed', async (req, res) => {
  let url = process.env.BACKEND_URL + 'recentlyViewed'
  const response = await axios({
    url : url,
    method: 'POST',
    headers: { "Content-Type": 'application/json' },
    data: {
      "user_id" : req.body.user_id
    }
  });
  const data = response.data.movies
  console.log("sending recentlyviewed data")
  return res.status(200).json( data )
})

router.post('/user-fav', async (req, res) => {
  let url = process.env.BACKEND_URL + 'userFav'
  const response = await axios({
    url : url,
    method: 'POST',
    headers: { "Content-Type": 'application/json' },
    data: {
      "user_id" : req.body.user_id
    }
  });
  const data = response.data
  console.log("sending favs data")
  return res.status(200).json( data )
})

router.post('/suggestQuery', async ( req, res ) => {
  const queryText = req.body.query
  const query = queryText.split(" ")
  let url = process.env.BACKEND_URL + 'search?keyword='
  for(var i = 0; i < query.length; i++){
    if(i == 0)
      url += query[i]
    else
      url += "%20" + query[i]
  }
  console.log(url)
  const typeQ = req.body.filter

  const return_body = {"type":""}
  console.log(typeQ);
  const response = await axios({
    url : url,
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
    },
    data: {
      "type" : typeQ
    }
  })
  // console.log(response)
  
  console.log("sending suggestions data")
  return res.status(200).json( response.data )
})

router.post('/clickSuggestion', async ( req, res ) => {
  console.log(req.body)
  let url = process.env.BACKEND_URL + 'search_click'
  
  const response = await axios({
    url : url,
    method: 'POST',
    data : {
      "url" : req.body.url, 
      "user_id": req.body.user_id
    }
  })
  console.log("sending clicked suggestion data")
  // console.log(response.data)
  return res.status(200).json( response.data )
})

router.post('/top250', async (req, res) => {
  const { sort, order } = req.body;
  console.log(req.body);
  let url = process.env.BACKEND_URL + 'top/250';
  const result = await axios({
    url : url,
    method: 'GET',
    headers: {
      "Content-Type": 'application/json',
    },
    data: {
      "sort": sort,
      "order": order
    }
  });
  return res.status(200).json( result.data );
})

router.get('/admin', async (req, res) => {

  let url = process.env.BACKEND_URL + 'admin';
  const result = await axios({
    url : url,
    method: 'GET',
    headers: {
      "Content-Type": 'application/json',
    },
  });
  // console.log(result.data);
  console.log("sending admin data");
  return res.status(200).json( result.data);
})

router.post('/pressedEnter', async (req, res) => {
  const queryText = req.body.query
  const query = queryText.split(" ")
  let url = process.env.BACKEND_URL + 'search/display?keyword='
  for(var i = 0; i < query.length; i++){
    if(i == 0)
      url += query[i]
    else
      url += "%20" + query[i]
  }
  console.log(url)
  const typeQ = req.body.filter
  const response = await axios({
    url : url,
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
    },
    data: {
      "type" : typeQ
    }
  })
  // console.log(response)
  console.log("sending enter query data");
  return res.status(200).json( response.data.movie )
})

module.exports = router