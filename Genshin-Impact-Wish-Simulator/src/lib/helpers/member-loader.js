import { memberList } from "$lib/store/app-stores";
import { localMemberList } from "./dataAPI/api-localstore";


export let memberDB = [];

const fooCharSet = new Set([
    "诃", "呵", "抲", "峆", "哬", "喝", "訶", "嗬",
    "禾", "纥", "合", "何", "劾", "咊", "和", "姀", "河", "郃", "紇", "曷", "柇", "狢", "盇", "阂", "饸",
    "釛", "核", "盉", "盍", "荷", "俰", "趷", "啝", "涸", "盒", "秴", "菏", "萂", "蚵", "龁", "惒", "訸",
    "颌", "嵑", "廅", "蓋", "滆", "楁", "毼", "詥", "貈", "貉", "鉌", "阖", "澕", "蒚", "閤", "熆", "閡",
    "鹖", "褐", "頜", "蝎", "篕", "翮", "螛", "魺", "餲", "礉", "闔", "鞨", "齕", "覈", "鶡", "龢",
    "吓", "咊", "佫", "贺", "袔", "隺", "寉", "賀", "猲", "嗃", "煂", "碋", "暍", "熇", "赫", "鹤",
    "翯", "壑", "癋", "嚇", "爀", "蠚", "皬", "鶴", "靎", "鸖", "靍", "靏"
]);

memberList.subscribe((v) => {
	memberDB = v;
});


export const loadMembers = (f) => {
    let reader = new FileReader();

    reader.onload = (e) => {
        let content = e.target.result;
        let data = [];

        console.log(content);

        let lines = content.split('\n');

        lines.forEach((lineContent, idx) => {
            if (lineContent.trim() !== '') {
                let arr = lineContent.split(' ');
		let chineseChar = arr.length == 2? arr[1].trim() : lineContent.trim();
		let firstChar = chineseChar[0];
                if (fooCharSet.has(firstChar)) {
                    return; // 跳过
		}
                data.push({
                    "name": `n-${idx}`,
                    "chineseChar": arr.length == 2? arr[1].trim() : lineContent.trim(),
                    "rarity": arr.length == 2 ? parseInt(arr[0]) : 3
                });
            }
        });
        
        console.log(data);
        memberDB = data;
        localMemberList.set(data);
        alert('上传成功');
    };

    reader.readAsText(f, 'UTF-8');

    // console.log(content);
    // return content;
}
