import { ChakraField } from "@/components/common/index"
import { Box, Progress, Stack, TabPanel } from "@chakra-ui/react"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import request from "superagent"

function MediaPostPanel() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imageUrl, setImageUrl] = useState("")

  const onDrop = useCallback(acceptedFiles => {
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dmztdsduf/upload"
    const cloudinaryPreset = "qapnebg6"

    request
      .post(cloudinaryUrl)
      .field("upload_preset", cloudinaryPreset)
      .field("file", acceptedFiles)
      .field("multiple", false)
      .on("progress", progress => {
        if (progress && progress.percent) {
          setUploadProgress(progress.percent)
        }
      })
      .end((error, response) => {
        if (error) {
          throw new Error(error)
        }
      })
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles
  } = useDropzone({
    onDrop,
    maxFiles: 1
  })

  return (
    <TabPanel>
      <Stack>
        <ChakraField
          label=""
          id="title"
          name="title"
          placeholder="title"
          aria-placeholder="Post Title"
        />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop some files here, or click to select files</p>
        )}
        <div {...getRootProps({})}>
          <Box id="upload-media" border="3px dashed" p={4} my={2}>
            <ChakraField
              label=""
              id="image"
              name="image"
              placeholder="image"
              aria-placeholder="Post Image"
            />
            <input {...getInputProps({})} />

            {uploadProgress === 100 ? "COMPLETE" : null}
            {uploadProgress !== 0 && uploadProgress !== 100 ? (
              <Progress my={4} size="lg" hasStripe value={uploadProgress} />
            ) : null}
          </Box>
        </div>
      </Stack>
    </TabPanel>
  )
}

export default MediaPostPanel
