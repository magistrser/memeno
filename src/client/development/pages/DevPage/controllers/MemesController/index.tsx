import React, { useState } from 'react';
import InputLine from '../../../../../components/development/InputLine';
import DevelopmentProvider from '../../../../../../providers/DevelopmentProvider';
import readFileText from '../../../../../utils/files/readTextFile';
import readBinaryFile from '../../../../../utils/files/readBinaryFile';
import developmentConnectionTracker from '../../../../developmentConnectionTracker';

function separateMemAndTagsFiles(files: File[]) {
    let tagsFiles = {};
    let memFiles = {};
    for (let i = 0; i < files.length; ++i) {
        if (files[i].type.startsWith('image')) {
            memFiles = {
                ...memFiles,
                [files[i].name.split('.')[0]]: files[i],
            };
            continue;
        }
        if (files[i].name.endsWith('tags')) {
            tagsFiles = {
                ...tagsFiles,
                [files[i].name.split('.')[0]]: files[i],
            };
            continue;
        }
    }

    return { tagsFiles, memFiles };
}

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

    const handleLoadMem = async () => {
        if (memes.length === 0) {
            props.setOutput('Select files');
            return;
        }
        let outputString = '';

        const { tagsFiles, memFiles } = separateMemAndTagsFiles(memes);
        const memNames = Object.keys(memFiles);
        for (let i = 0; i < memNames.length; ++i) {
            const memName = memNames[i];
            if (!tagsFiles[memName]) {
                outputString += `[-] Tags file miss: '${memName}'`;
                props.setOutput(outputString);
                continue;
            }

            const tagsStr = await readFileText(tagsFiles[memName]);
            const tags = tagsStr.split(/\r?\n/).filter((x) => x.length);

            const memData = await readBinaryFile(memFiles[memName]);
            const memId = await developmentConnectionTracker.makeRequest(() =>
                DevelopmentProvider.memes.addMem({
                    data: memData,
                    tags: tags,
                    user_id: userIdAddMem,
                })
            );
            outputString += `\n[+] Mem'${memName}' id: ${memId}, tags: ${tags.join(
                ', '
            )}`;
            props.setOutput(outputString);
        }
        outputString += '\n[+] All memes loaded';
        props.setOutput(outputString);
    };

    const [memIdRemoveMem, setMemIdRemoveMem] = useState(0);
    const getValuesForRemoveMem = () => [
        {
            label: 'Mem ID',
            onChange: setMemIdRemoveMem,
            value: memIdRemoveMem,
        },
    ];

    const [memIdRateMem, setMemIdRateMem] = useState(0);
    const [likeRateMem, setLikeIdRateMem] = useState(0);
    const getValuesForRateMem = () => [
        {
            label: 'Mem ID',
            onChange: setMemIdRateMem,
            value: memIdRateMem,
        },
        {
            label: 'Rating (0/1)',
            onChange: setLikeIdRateMem,
            value: likeRateMem,
        },
    ];

    return (
        <div className="users-controller">
            <InputLine
                label="Add Memes"
                onEnter={handleLoadMem}
                values={getValuesForCreateUser()}
            />
            <InputLine
                label="Remove Mem"
                onEnter={() => {
                    developmentConnectionTracker
                        .makeRequest(() =>
                            DevelopmentProvider.memes.removeMem({
                                mem_id: memIdRemoveMem,
                            })
                        )
                        .then((res) => {
                            props.setOutput(res);
                        })
                        .catch(props.setOutput);
                }}
                values={getValuesForRemoveMem()}
            />
            <InputLine
                label="Rate Mem"
                onEnter={() => {
                    developmentConnectionTracker
                        .makeRequest(() =>
                            DevelopmentProvider.memes.rateMem({
                                mem_id: memIdRateMem,
                                like: likeRateMem == 1,
                            })
                        )
                        .then((res) => {
                            props.setOutput(res);
                        })
                        .catch(props.setOutput);
                }}
                values={getValuesForRateMem()}
            />
        </div>
    );
};

export default Index;
