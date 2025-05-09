import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from 'src/components/Shared/CustomDataGrid'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Snackbar from '@mui/material/Snackbar'
import Icon from '../../../@core/components/icon'
import SnackbarConfirmActions from 'src/components/Shared/SnackbarConfirmActions'
import { deleteAttributes } from 'src/components/Attributes/AttributesServices'
import AttributesRowOptions from 'src/components/Attributes/AttributesRowOptions'

const AttributesTable = ({
  data,
  fetchData,
}) => {
  const { t } = useTranslation()
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)

  const handleDelete = () => {
    deleteAttributes([selectedRowId]).then(res => {
      setSelectedRowId(null)
      setOpenDeleteSnackbar(false)
      fetchData()
    })
  }

  const handleClickDeleteButton = id => {
    setSelectedRowId(id)
    setOpenDeleteSnackbar(true)
  }

  const handleCloseDeleteSnackbar = () => {
    setSelectedRowId(null)
    setOpenDeleteSnackbar(false)
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 50,
      field: 'id',
      headerName: t('id'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.id}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'name',
      headerName: t('name'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.name}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'attribute_set',
      headerName: t('attributes_sets'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.attribute_set}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'order',
      headerName: t('order'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.order}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'is_default',
      headerName: t('is_default'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.is_default ? (
            <Icon icon='tabler:circle-check' color='green' fontSize='2rem' />
          ) : (
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red' />
          )}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'active',
      headerName: t('active'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.active ? (
            <Icon icon='tabler:circle-check' color='green' fontSize='2rem' />
          ) : (
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red' />
          )}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'created_at',
      headerName: t('created_at'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.created_at}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: t('actions'),
      renderCell: ({ row }) => (
        <AttributesRowOptions id={row.id} handleClickDeleteButton={handleClickDeleteButton} />
      )
    }
  ]

  return (
      <Card item xs={12}>
        <CardHeader title={t('attributes')} />
        <CustomDataGrid 
          rows={data}
          columns={columns}
          total={data.length}
          paginationModel={{perPage: 12 , page: 1}}
          multiSelection={false}
        />
        <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openDeleteSnackbar}
        onClose={handleCloseDeleteSnackbar}
        message={t('are_you_sure')}
        action={<SnackbarConfirmActions handleConfirm={handleDelete} handleClose={handleCloseDeleteSnackbar} />}
      />
      </Card>
  )
}

export default AttributesTable
