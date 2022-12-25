import { Button, Card, CardBody, CardFooter, CardHeader, Text } from '@chakra-ui/react';
import Image from 'next/image';
import queryString from 'query-string';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import Plus from '../../../../public/images/+.svg';
import FilterIcon from '../../../../public/images/filter-icon.svg';
import X from '../../../../public/images/littleX.svg';
import api from '../../../api';
import useStorage from '../../../hooks/useStorage';
import ICategory from '../../../interfaces/ICategory.type';
import IStorage from '../../../interfaces/IStorage.type';
import ITransactions from '../../../interfaces/ITransactions.type';
import headers from '../../../utils/Token';
import styles from './styles.module.sass';

interface Props {
    categories: ICategory[];
    setTransactions: Dispatch<SetStateAction<ITransactions[]>>;
    getTransactions(): void;
}
export default function Filter({ categories, setTransactions, getTransactions }: Props) {
    const { user }: IStorage = useStorage();
    const [showCard, setShowCard] = useState<boolean>(true);
    const [params, setParams] = useState<String[]>([]);

    function handleParams(e: MouseEvent<HTMLButtonElement>, category: ICategory) {
        if (params && params.includes(e.currentTarget.value)) {
            setParams((params) =>
                params.filter((element) => element !== e.currentTarget.value)
            );
        } else {
            setParams([...params, category.description]);
        }
    }

    async function getTransactionsWithFilter() {
        try {
            const query = queryString.stringify(
                { filter: params },
                { arrayFormat: 'bracket' }
            );

            const { data } = await api.get(
                `/transactions?${query}`,
                headers(user?.token)
            );
            setTransactions(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={styles.container}>
            <Button className={styles.btnFilter} onClick={() => setShowCard(!showCard)}>
                <Image src={FilterIcon} alt="filter-logo" />
                Filtrar
            </Button>
            <div>
                {showCard && (
                    <Card className={styles.card}>
                        <CardHeader className={styles.cardHeader}>
                            <Text className={styles.text}>Categoria</Text>
                        </CardHeader>
                        <CardBody className={styles.cardBody}>
                            {categories?.map((category: ICategory) => {
                                return (
                                    <Button
                                        key={category.id}
                                        value={category.description}
                                        className={
                                            !params.includes(category.description)
                                                ? styles.btnInactive
                                                : styles.btnActive
                                        }
                                        onClick={(e) => {
                                            handleParams(e, category);
                                        }}
                                    >
                                        {category.description}
                                        <Image
                                            src={
                                                !params.includes(category.description)
                                                    ? Plus
                                                    : X
                                            }
                                            alt="+ or x"
                                        />
                                    </Button>
                                );
                            })}
                        </CardBody>
                        <CardFooter className={styles.cardFooter}>
                            <Button
                                className={styles.btnInactive}
                                onClick={() => {
                                    setParams([]);
                                    getTransactions();
                                }}
                            >
                                Limpar Filtros
                            </Button>
                            <Button
                                className={styles.btnInactive}
                                onClick={getTransactionsWithFilter}
                            >
                                Aplicar Filtros
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    );
}
