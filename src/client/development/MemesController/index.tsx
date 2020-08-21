import React, { useState } from 'react';
import InputLine from '../../components/development/InputLine';
import DevelopmentProvider from '../../../providers/DevelopmentProvider';

interface Props {
    setOutput: (output: any) => void;
}

const Index: React.FC<Props> = (props) => {
    const [memes, setMemes] = useState<File[]>([]);
    const [userIdAddMem, setUserIdAddMem] = useState(0);
    const getValuesForCreateUser = () => [
        {
            label: 'Files',
            onChange: setMemes,
            type: 'file',
        },
        {
            label: 'User ID',
            onChange: setUserIdAddMem,
            value: userIdAddMem,
        },
    ];


    const handleLoadMem = () => {
        if(memes.length === 0) {
            props.setOutput('Select files');
            return;
        }
        let outputString = '';

        let tagsFiles = {};
        let memFiles = {}
        for (let i = 0; i < memes.length; ++i) {
            if(memes[i].type.startsWith('image')) {
                memFiles = {...memFiles, [memes[i].name.split('.')[0]]: memes[i]};
                continue;
            }
            if(memes[i].name.endsWith('txt')) {
                tagsFiles = {...tagsFiles, [memes[i].name.split('.')[0]]: memes[i]}
                continue;
            }
        }

        const memNames = Object.keys(memFiles);
        let countMemesToUpload = memNames.length;
        let loadedMemesCount = 0;

        for(let i = 0; i < memNames.length; ++i) {
            const memName = memNames[i];
            if(!tagsFiles[memName]) {
                --countMemesToUpload;
                outputString += `[!] Not found tags file for: '${memName}'`;
                props.setOutput(outputString);
                continue;
            }

            const tagsReader = new FileReader();
            tagsReader.onload = function (ev) {
                const tags = (tagsReader.result as string).split(/\r?\n/).filter(x => x.length);
                const memReader = new FileReader();
                memReader.onload = function (ev) {
                    DevelopmentProvider.memes
                        .addMem({
                            data: Buffer.from(memReader.result as ArrayBuffer),
                            tags: tags,
                            user_id: userIdAddMem
                        })
                        .then((res) => {
                            outputString += `\n[+] Mem'${memName}' uploaded to server with id: ${res} and tags: ${tags.join(', ')}`;
                            ++loadedMemesCount;
                            if(loadedMemesCount >= countMemesToUpload) {
                                outputString += '\n[+] All memes loaded';
                            }
                            props.setOutput(outputString);
                        })
                        .catch(props.setOutput);
                }

                memReader.readAsArrayBuffer(tagsFiles[memName]);
            };
            tagsReader.readAsText(tagsFiles[memName]);
        }
    }

    return (
        <div className="users-controller">
            <InputLine
                label="Add Memes"
                onEnter={handleLoadMem}
                values={getValuesForCreateUser()}
            />
        </div>
    );
};

export default Index;
