import styles from './ModuleLayout.module.css';

function ModuleLayout({id,emoji,title,children}){
    return(
        <div className={styles.module}>
            <header className={styles.header}>
                <span aria-hidden="true">{emoji}</span>
                <h2>{title}</h2>
            </header>
            <div className={styles.moduleContent}> 
                {children}
            </div>
        </div>
    )     
    
}
export default ModuleLayout;