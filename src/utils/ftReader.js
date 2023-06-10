class FT {
    constructor(sirius) {
        this._sirius = sirius;
        this._trees = new Map();
    }

    formular(index) {
        return this._sirius.fragments[index].molecularFormula;
    }

    getSubTree(index) {
        return this._trees.get(index) || {"name": this.formular(index)};
    }

    editSubTree(index, subTree) {
        if (this._trees.has(index)) {
            this._trees.get(index).children.push(subTree);
        } else {
            this._trees.set(index, {"name": this.formular(index), "children": [subTree]});
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
        return null;
    }
    const ft = new FT(sirius);
    return ft.getTree();
}

export default parseSirius;