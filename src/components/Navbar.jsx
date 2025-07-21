import React from 'react'
import styles from "../styles/home.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
       <div className={styles.navbar}>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
