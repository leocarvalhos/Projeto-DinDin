import { Button } from '@chakra-ui/react';
import React from 'react';
import styles from './styles.module.sass';
export default function DeleteTransaction() {
    return (
        <div className={styles.container}>
            <strong>Apagar item?</strong>
            <div>
                <Button>Sim</Button>
                <Button>Não</Button>
            </div>
        </div>
    );
}
