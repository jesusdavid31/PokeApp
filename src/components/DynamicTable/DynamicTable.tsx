/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';

import {
    Grid,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    TableHead,
    Box,
    Pagination, 
    Stack
} from '@mui/material';

// import noContentImg from '../../assets/images/svgs/Search Engine_Two Color.svg';
import './styles.css';

interface Props {
    isLoading: boolean;
    columns: any[];
    currentData: any[];
    actualPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    handlePageClick: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const BasicTable = ({
    isLoading = true,
    columns,
    currentData = [],
    actualPage = 1,
    totalPages,
    itemsPerPage = 0,
    totalItems = 0,
    handlePageClick
}: Props) => (
    <>
        <Grid container spacing={0}>
            <Grid size={{ xs: 12 }}>

                {/* TABLA DINAMICA */}
                <TableContainer>
                    <Table
                        aria-label="simple table"
                        sx={{
                            whiteSpace: 'normal',
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell key={`table-cell-${column.id}-${index}`}>
                                        <Typography variant="h6">{column.label}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!isLoading && (
                                <>
                                    {currentData?.map((row, index) => (
                                        <TableRow key={`table-row-${index}`} className={`card ${row.color}`}>
                                            {columns?.map((column) => (
                                                <TableCell key={`data-table-cell-${column.id}`} sx={{
                                                    maxWidth: '270px',
                                                }}>
                                                    <Typography color="textSecondary" variant="h6" fontWeight={400} sx={{ color: '#fff !important', }}>
                                                        {row[column.id]}
                                                    </Typography>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {isLoading && (
                    <Box className='center-loading'>
                        <svg viewBox="25 25 50 50" className='loading-data'>
                            <circle r="20" cy="50" cx="50" />
                        </svg>
                    </Box> 
                )}

                { ( !isLoading && totalItems === 0 ) && 
                    <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ textAlign: 'center' }} className='without-results'>
                        {/* <img src={noContentImg} alt='Sin contenido' className='no-content' /> */}
                        <p>Sin contenido</p>
                    </Grid>
                }

                { ( !isLoading && totalItems > 0) && 
                    <Box 
                        sx={{ mt: 3,  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px' }}
                    >
                        <Box sx={{ marginTop: '7px' }}>
                            <Typography variant="h6">
                                {totalItems > 0 ? (
                                    <>
                                        Mostrando del {(actualPage - 1) * itemsPerPage + 1} al{" "}
                                        {Math.min(actualPage * itemsPerPage, totalItems)} de un total de {totalItems} elementos
                                    </>
                                ) : (
                                    <>No hay datos disponibles.</>
                                )}
                            </Typography>
                        </Box>
                        <Stack spacing={2} >
                            <Pagination 
                                count={totalPages} 
                                color="primary" 
                                page={actualPage} 
                                siblingCount={0} 
                                boundaryCount={2} 
                                onChange={handlePageClick}
                            />
                        </Stack>
                    </Box>
                }
                    
            </Grid>
        </Grid>
    </>
);

export default BasicTable;
