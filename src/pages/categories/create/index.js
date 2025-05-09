import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import CategoriesForm from 'src/components/Categories/CategoriesForm'

const defaultValues = {
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
    long_description_en: "",
    long_description_ar: "",
    image: "",
    category_id: "",
    order : "",
    active: false,
    featured: false
}

const CategoryCreate = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imgSrc, setImgSrc] = useState('')
  const [categoryImg, setCategoryImg] = useState('')
  const [content, setContent] = useState('')
  const [deleteImage , setDeleteImage] = useState(false);

  const auth = useSelector(state => state.auth)

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    setLoading(true)

    data.parent_id = data.category_id;

    if(!imgSrc){ 
        delete data.image;
    }else{ 
        data.image = imgSrc;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}categories`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push('/categories')
        reset()
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  return (
    <Card>
      <CategoriesForm
        getValues={getValues}
        type={'create'}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        categoryImg={categoryImg}
        setCategoryImg={setCategoryImg}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('category_create')}
        loading={loading}
        content={content}
        setContent={setContent}
        setDeleteImage={setDeleteImage}
      />
    </Card>
  )
}

export default CategoryCreate
