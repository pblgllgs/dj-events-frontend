import Link from 'next/link'
import React from 'react'
import Layout from '@/components/Layout'
import styles from '@/styles/404.module.css'
import { FaExclamationTriangle } from  'react-icons/fa'

const NotFoundPage = () => {
  return (
    <Layout title={'Page not fount'}>
        <div className={styles.error}>
            <h1><FaExclamationTriangle />404</h1>
            <h4>Sorry not found nothing here!!!</h4>
            <Link href={'/'}>
                Go back to home
            </Link>
        </div>
    </Layout>
  )
}

export default NotFoundPage