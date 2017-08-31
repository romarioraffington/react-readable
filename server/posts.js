const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Testing React Apps 👨‍🔬',
    body: 'Testing is an infinite process of comparing the invisible to the ambiguous in order to avoid the unthinkable happening',
    author: 'Romario Raffington',
    category: 'react',
    voteScore: -10,
    deleted: false 
  },

  "12345xf0y6ziyjabvozdd253nd": {
    id: '12345xf0y6ziyjabvozdd253nd',
    timestamp: 1504213443368,
    title: 'Udacity + React = ❤️',
    body: 'React is completely transforming Front-End Development. Master this powerful UI library from Facebook with Udacity',
    author: 'Udacity',
    category: 'react',
    voteScore: 30,
    deleted: false 
  },

  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'Micheal Jackson',
    category: 'redux',
    voteScore: 6,
    deleted: false
  },

  "12ni6ok3ym7mf1p33lnez": {
    id: '12ni6ok3ym7mf1p33lnez',
    timestamp: 1498479767190,
    title: 'Udacity is Awesome 😍',
    body: 'The goal of this program is to equip you with the skills and experience you\'ll need to become a professional React developer.',
    author: 'Udacity',
    category: 'Udacity',
    voteScore: 20,
    deleted: false
  },

  "12ni6ok3ym7mf1p33lnasas22": {
    id: '12ni6ok3ym7mf1p33lnasas22',
    timestamp: 1498499767190,
    title: 'This Message is Deleted ☹️',
    body: 'This message is deleted, it will not be shown on screen.',
    author: 'Udacity',
    category: 'Udacity',
    voteScore: 20,
    deleted: true
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted 
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts.deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)
    
    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    }
     
    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
}