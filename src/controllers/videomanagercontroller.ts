import { spawn } from 'child_process'

const convertFilesWebmToMp4 = (sourceVideo: any, outputVideo: any) => new Promise((reject, resolve) => {
    let options = {
        shell: true
    }

    let args = ['-fflags', '-y', '+genpts', '-i', sourceVideo, '-r', '24', outputVideo]

    const child = spawn('ffmpeg', args, options)


    child.stdout.on('data', (data: any) => {
        console.log(`Output: ${data}`)
    })

    child.stderr.on('data', (data: any) => {
        console.log("🚀 ~ file: index.ts ~ line 26 ~ child.stderr.on ~ data", data)
        if (data.includes('Error'))
            reject('Error al procesar el comando')
    })


    child.on('close', (code) => {
        resolve(code)
    })
})

class VIDEOMANAGER {
    async createOutputVideo(outputPath: any) {
        return `../../${outputPath}.mp4`
    }
    async changeFormatVideo(sourceVideo: any, outputPath: any): Promise<string> {
        try {
            const outputVideo = await this.createOutputVideo(outputPath)
            await convertFilesWebmToMp4(sourceVideo, outputVideo)

            return outputVideo
        } catch (error) {
            throw error
        }
    }
}

export default new VIDEOMANAGER()