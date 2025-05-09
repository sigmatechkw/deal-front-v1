import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from 'src/components/Shared/CustomDataGrid'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Snackbar from '@mui/material/Snackbar'
import Icon from '../../../@core/components/icon'
import SnackbarConfirmActions from 'src/components/Shared/SnackbarConfirmActions'
import { deleteCategories } from '../CategoriesServices'
import {useRouter} from "next/router";
import IconButton from "@mui/material/IconButton";

const SubCategoriesTable = ({
  data,
}) => {
  const { t } = useTranslation()
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)

  const router = useRouter()


  const handleDelete = async () => {
    await deleteCategories([selectedRowId]).then(res => {
      setSelectedRowId(null)
      setOpenDeleteSnackbar(false)
      window.location.reload();
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

  const handleEdit = (id) => {
    router.push(`/categories/edit/${id}`)
  }

  const handleView = (id) => {
    router.push(`/categories/details/${id}`)
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
      field: 'order',
      headerName: t('order'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.order}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'sub_categories_count',
      headerName: t('sub_categories_count'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.sub_categories_count}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'featured',
      headerName: t('is_featured'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.featured ? (
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
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: t('actions'),
      renderCell: ({ row }) => 
        <>
        <IconButton
          color="secondary"
          onClick={() => handleView(row.id)}>
          <Icon icon='tabler:eye' fontSize={20}/>
        </IconButton>
        <IconButton
          color="warning"
          onClick={() => handleEdit(row.id)}>
          <Icon icon='tabler:edit' fontSize={20}/>
        </IconButton>
        <IconButton
          color="error"
          onClick={() => handleClickDeleteButton(row.id)}>
          <Icon icon='tabler:trash' fontSize={20}/>
        </IconButton>
      </>
    }
  ]

  return (
      <Card item xs={12}>
        <CardHeader title={t('sub_categories')} />
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

export default SubCategoriesTable
