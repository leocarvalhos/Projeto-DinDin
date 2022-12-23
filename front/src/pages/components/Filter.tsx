import { Button, Card, CardBody, CardFooter, CardHeader, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import Plus from '../../../public/images/+.svg';
import FilterIcon from '../../../public/images/filter-icon.svg';
import X from '../../../public/images/littleX.svg';
import api from '../../api';
import styles from '../../styles/components/Filter.module.sass';
import headers from '../../utils/Token';
import useStorage from '../../hooks/useStorage';
import { useSearchParams } from 'next/navigation';
import queryString from 'query-string';
interface Category {
    id: number;
    description: string;
}
interface Props {
    categories: any;
    setTransactions: Dispatch<SetStateAction<Array<any>>>;
}
export default function Filter({ categories, setTransactions }: Props) {
    const searchParams = useSearchParams();
    const { user }: any = useStorage();
    const [showCard, setShowCard] = useState<boolean>(true);
    const [params, setParams]: any = useState([]);

    function handleParams(e: any, category: any) {
        if (params && params.includes(e.target.value)) {
            setParams((params: any) =>
                params.filter((element: any) => element !== e.target.value)
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

            const { data } = await api.get(`/transactions?${query}`, headers(user.token));
            setTransactions(data);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(params);
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
                            {categories.map((category: Category) => {
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
                                    getTransactionsWithFilter();
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
