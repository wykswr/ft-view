class FT {
    constructor(sirius) {
        this._sirius = sirius;
        this._trees = new Map();
    }

    formular(index) {
        return this._sirius.fragments[index].molecularFormula;
    }

    value(index) {
        return {mz: this._sirius.fragments[index].mz, ion: this._sirius.fragments[index].ion};
    }

    getSubTree(index) {
        return this._trees.get(index) || {name: this.formular(index), value: this.value(index)};
    }

    editSubTree(index, subTree) {
        if (this._trees.has(index)) {
            this._trees.get(index).children.push(subTree);
        } else {
            this._trees.set(index, {name: this.formular(index), children: [subTree], value: this.value(index)});
        }
    }

    buildTree() {
        for (let i = this._sirius.losses.length - 1; i >= 0; i--) {
            const loss = this._sirius.losses[i];
            const parent = loss.source;
            const child = loss.target;
            const childTree = this.getSubTree(child);
            this.editSubTree(parent, childTree);
        }
    }

    getTree() {
        this.buildTree();
        return this.getSubTree(0);
    }
}

function parseSirius(sirius) {
    if (!sirius) {
        return {status: "empty"};
    }
    const ft = new FT(sirius);
    try {
        return {status: "success", tree: ft.getTree()};
    } catch (e) {
        return {status: "error", error: "Not a valid Sirius fragmentation tree JSON file!"};
    }
}

export default parseSirius;