import React, { FC, useState, useEffect } from 'react'
import { Upload, Button, Icon, message } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'

/**
 * 重新定制 antd 上传组件
 */
interface UploadSearchProps {
  onChange?: (i?: any[]) => void
}

const UploadProps = {
  name: 'file',
  action: 'https://192.168.83.123:9122/analysis-version-file',
}

export const UploadSearch: FC<UploadSearchProps> = props => {
  const { onChange } = props
  const [items, setItems] = useState<any[]>()

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      const { items } = info.file.response
      setItems(items)
      message.success(`${info.file.name} 上传成功`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`)
    }
  }

  const handleRemove = () => {
    setItems(undefined)
  }

  useEffect(() => {
    if (onChange) {
      onChange(items)
    }
  }, [items])
  return !!items?.length ? (
    <Button type="danger" onClick={handleRemove}>
      清空上传文件
    </Button>
  ) : (
    <Upload {...UploadProps} onChange={handleChange}>
      <Button>
        <Icon type="upload" /> 上传匹配文件
      </Button>
    </Upload>
  )
}

export default UploadSearch
