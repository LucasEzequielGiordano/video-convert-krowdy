import videoController from "./video.controller"
import VIDEOMANAGER from "./videomanagercontroller"

class VIDEOPROCESSCONTROLLER {
    // __dirname
    // fs
    // syncDir
    // implementar la funcion createOutputpath
    // convertfile
    // retornar el path de video
    async convert(originUrlVideo: string, videoId: any) {
        try {
            await videoController.createStatusProcessVideo('download', videoId)

            // const localPathVideo = await this.downloadFile(originUrlVideo)

            await videoController.createStatusProcessVideo('validate', videoId)

            // const isValidFile = await this.validateFile(localPathVideo)

            // if(!isValidFile) throw new Error('Error en el archivo')

            // ingreso en una variable el metodo para la creacion del output
            const outputVideoPath = await this.createOuputPath()

            await videoController.createStatusProcessVideo('convert', videoId)
            
            // ingreso en la variable outputpath las funciones creadas para su ouput y conversion
            const outputPath = await this.convertFile(originUrlVideo, outputVideoPath)

            await videoController.createStatusProcessVideo('upload', videoId)

            // const newOriginUrlVideoConvert = await this.uploadFile(outputVideoPath)

            await videoController.createStatusProcessVideo('notified', videoId)

            // this.logExecuteProcess(newOriginUrlVideoConvert)
            // return newOriginUrlVideoConvert
            // retorno el output con todos los metodos de conversion para utilizar en video.controller
            return { outputPath }
        } catch (error) {
            await videoController.createStatusProcessVideo('error', videoId)
            throw error
        }
    }

    async downloadFile(originUrlVideo: string) {
        return '../../inputvideo.webm'
    }
    // ffprobe
    async validateFile(localPathVideo: string) {
        // ffprobeFromSpawn(localPath)
        // return true/false
        return true
    }

    // deberá retornar un path 
    async createOuputPath() {

        // retorno el metodo join para la creacion del directorio donde quiero colocar mi outPut
        return require('node:path').join(__dirname, '../../')
    }

    async convertFile(localPathVideo: string, ouputPath: string) {
        try {
            // ffmpegFromSpawn(localPath, ouputPath)

            // retorno la clase videomanager con el metodo para cambiar el formato del video
            return await VIDEOMANAGER.changeFormatVideo(localPathVideo, ouputPath)

        } catch (error) {
            throw error
        }
    }

    async uploadFile(ouputPath: string) {
        try {
            // subir el file y retornal el newOriginUrlVideoConvert
            return ''
        } catch (error) {
            throw error
        }
    }

    logExecuteProcess(newOriginUrlVideoConvert: string) {
        console.log("🚀 ~ >>>>>>> newOriginUrlVideoConvert", newOriginUrlVideoConvert)
    }
}

export default new VIDEOPROCESSCONTROLLER()