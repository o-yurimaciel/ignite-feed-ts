import styles from './App.module.css'
import './global.css'
import { Post } from "./components/Post"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/o-yurimaciel.png',
      name: 'Yuri Maciel',
      role: 'Front-end Engineer'
    },
    content: 'Fala galeraa 👋\nAcabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀\njane.design/doctorcare',
    hashtags: ['novoprojeto', 'nlw', 'rocketseat'],
    publishedAt: new Date('2023-10-29 21:0:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/pedrofnuness.png',
      name: 'Pedro Nunes',
      role: 'Front-end Developer'
    },
    content: 'Fala galeraa 👋\nAcabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀\njane.design/doctorcare',
    hashtags: ['novoprojeto', 'nlw', 'rocketseat'],
    publishedAt: new Date('2023-10-29 21:0:00')
  }
]

function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post 
              key={post.id} 
              author={post.author} 
              content={post.content} 
              hashtags={post.hashtags} 
              publishedAt={post.publishedAt} />
            ) 
          })}
        </main>
      </div>
    </>
  )
}

export default App
