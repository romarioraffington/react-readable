const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1504491657097,
    title: 'Testing React Apps 👨‍🔬',
    body: 'In July, I completed the first project for the Udacity React Nanodegree Program. Having a QA background, I decided to write unit tests to ensure functionality didn’t break as I added new features. \n\nAfter completing the project I decided to share it with my classmates via slack. \n\nMost of the resources I recommended, however, showed examples instead of explaining the thought process behind writing certain tests. In my opinion, the “why” is more important because that knowledge can be transferred onto testing other React apps. \n\n It’s like the old saying — you give a man a few examples and he can only test a few scenarios. Tell a man the “why” and he can apply it to many other scenarios… or something like that 😶.',
    author: 'Romario Raffington',
    category: 'react',
    voteScore: -10,
    deleted: false 
  },

  "12345xf0y6ziyjabvozdd253nd": {
    id: '12345xf0y6ziyjabvozdd253nd',
    timestamp: 1468479767190,
    title: 'Udacity + React = ❤️',
    body: "React is a powerful JavaScript library ideal for building interactive, data-driven user interfaces, and it’s used by some of the most successful brands in the world, including Facebook, Netflix, Airbnb, and more. \n\n The goal of this program is to equip you with the skills and experience you'll need to become a professional React developer. We designed the curriculum in collaboration with the experts from React Training to ensure that graduates emerge well-prepared to take advantage of dramatically increasing demand for developers with React skills.",
    author: 'Richard Kalehoff',
    category: 'udacity',
    voteScore: 30,
    deleted: false 
  },

  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1504213443368,
    title: 'Learn Redux in 10 minutes! 🛫',
    body: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.\n\nReact components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props. \n\nJSX is optional and not required to use React. Try clicking on "Compiled JS" to see the raw JavaScript code produced by the JSX compiler.',
    author: 'Micheal Jackson',
    category: 'redux',
    voteScore: 6,
    deleted: false
  },

  "12ni6ok3ym7mf1p33lnez": {
    id: '12ni6ok3ym7mf1p33lnez',
    timestamp: 1498479767190,
    title: 'React Newletter ✍️',
    body: 'The free, weekly newsletter of the best React news, articles, projects, and more - brought to you by TylerMcGinnis.com. Curated with 💜 by Tyler McGinnis and Ean Platter\n\nService workers can give us instant page loads and the ability to browse with little or no internet connection. This talk includes a Service Worker primer and steps for enabling offline browsing in a React app.\n\nService workers can give us instant page loads and the ability to browse with little or no internet connection. This talk includes a Service Worker primer and steps for enabling offline browsing in a React app.',
    author: 'Tyler McGinnis and Ean Platter',
    category: 'react',
    voteScore: 29,
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