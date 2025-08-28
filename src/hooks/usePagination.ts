import {useEffect, useMemo, useState} from 'react';

export const usePagination = (totalItems: number) => {
    const [currentPage, setCurrentPage] = useState<number>(0);

    const getItemsPerPage = () => {
        if (window.innerWidth <= 580) return 1;
        if (window.innerWidth <= 978) return 2;
        return 3;
    };

    const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const isSingleItem = useMemo(() => totalItems === 1, [totalItems]);

    useEffect(() => {
        const handleResize = () => {
            const newItemsPerPage = getItemsPerPage();
            if (newItemsPerPage !== itemsPerPage) {
                setItemsPerPage(newItemsPerPage);
                const newTotalPages = Math.ceil(totalItems / newItemsPerPage);
                if (currentPage >= newTotalPages && newTotalPages > 0) {
                    setCurrentPage(0);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [itemsPerPage, currentPage, totalItems]);

    useEffect(() => {
        const newTotalPages = Math.ceil(totalItems / itemsPerPage);
        if (currentPage >= newTotalPages && newTotalPages > 0) {
            setCurrentPage(0);
        }
    }, [totalItems, itemsPerPage, currentPage]);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const getCurrentPageItems = <T, >(items: T[]): T[] => {
        const startIndex = currentPage * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };

    return {
        currentPage,
        totalPages,
        itemsPerPage,
        isSingleItem,
        nextPage,
        prevPage,
        goToPage,
        getCurrentPageItems
    };
};