import fs from 'fs'
import matter from 'gray-matter'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import { contentFilePaths, CONTENT_PATH, tutorialFilePaths, TUTORIAL_PATH } from '../utils/mdxUtils'

export default function Home({ content, tutorial }) {
  console.log('tutorial', tutorial)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Real World Testing with Cypress</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <ul>
          {content.map((lesson) => (
            <li key={lesson.filePath}>
              <Link
                as={`/content/${lesson.filePath.replace(/\.mdx?$/, '')}`}
                href={`/content/[slug]`}
              >
                <a>{lesson.data.title}</a>
              </Link>
            </li>
          ))}
        </ul>
        <br />
        <ul>
          {tutorial.map((lesson) => (
            <li key={lesson.filePath}>
              <Link
                as={`/content/${lesson.filePath.replace(/\.mdx?$/, '')}`}
                href={`/content/[slug]`}
              >
                <a>{lesson.data.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}

export function getStaticProps() {
  const content = contentFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(CONTENT_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
    }
  })

  const tutorial = tutorialFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(TUTORIAL_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
    }
  })


  return { props: { content, tutorial } }
}