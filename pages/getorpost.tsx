import styles from '../styles/Home.module.css'


export default function getOrPost(){
  return(
  <div className={styles.container}>
    <div  className={styles.main}>

      <h1> What do you want today? </h1>
 
    <div className={styles.grid}>

      
    <a href="https://nextjs.org/docs" className={styles.cardGetorpost}>
    GET
      
    </a>
    <a href="https://nextjs.org/docs" className={styles.cardGetorpost}>
    WRITE
      
    </a>

    
    </div>
    </div>

    </div>    

)
}