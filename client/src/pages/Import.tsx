import React from 'react'

import { Formik, FormikActions } from 'formik'
import * as Yup from 'yup'

import Layout from '../components/layout/Layout'

import axios from 'axios'
import { Alert } from '../components/basic/Alert';


type SubmitHandler = (values: {file: any}, formikActions: FormikActions<{ file: any }>) => void
const submitHandler:SubmitHandler = async (values, { setFieldError, setStatus, resetForm }) => {
  const reader = new FileReader()
  reader.onload = async (e:any) => {
    try {
      await axios.put('http://localhost:8000/api/shoes/csv-import/', reader.result, {
        headers: {
          'Content-Type': 'application/CSV',
          'Content-Disposition': `attachment;filename=${values.file.name}`
        }
      })
      resetForm()
      setStatus({success: true})
    } catch {
      console.log(reader.result)
      setFieldError('file', 'Não foi possível processar o arquivo. Verifique se o formato dos dados está correto.')
    }
  }
  // reader.readAsBinaryString(values.file)
  reader.readAsText(values.file)
}


const ImportCSVFile:React.FC<{path:string}> = (props) => {
  const initialValue:{file:any} = { 
    file: null
  }
  return (<>
    <div className="container-fluid">
      <div className="row my-5 mx-1 h-75 justify-content-center shadow-sm p-3">
        <Formik 
          initialValues={ initialValue }
          onSubmit={ submitHandler }
          initialStatus={{success:false}}
          validationSchema={
            Yup.object().shape({
              file: Yup.mixed().required("Selecione um arquivo."),
            })
          }
          render={ ({ status, errors, handleSubmit, setFieldValue, isSubmitting, submitCount }) =>
            {
              return (<form onSubmit={ handleSubmit }>
                <div className="form-group">
                  <label htmlFor="file" className="d-block text-center text-info">Selecione o arquivo CSV</label>
                  <input id="file" name="file" type="file" className="form-control" accept=".csv" onChange={(event) => {
                    const files = event.currentTarget.files;
                    if (files && files.length)
                      setFieldValue("file", files[0])
                  } } />
                </div>
                <div className="row justify-content-center">
                  <button type="submit" className="btn btn-white border-primary mt-5 rounded-">Enviar</button>
                </div>
                <div className="row justify-content-center mt-3">
                  {(errors && errors.file) ?
                    <Alert type={'danger'} message={ errors.file as string} />
                    : status.success &&
                    <Alert type={'success'} message="Arquivo processado com sucesso!" />
                  }
                </div>
              </form>);
            }
          }
        />
      </div>
    </div>
  </>);
}

export default Layout(ImportCSVFile)