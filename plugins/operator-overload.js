const operatorToFunction = {
    '+': 'add',
    '-': 'sub',
    '*': 'mul',
    '/': 'div',
    '%': 'mod',
};

const unaryOperatorToFunction = {
    '-': 'neg',
};

// 複合代入演算子 → 元の二項演算子
const assignmentOperatorToBinary = {
    '+=': '+',
    '-=': '-',
    '*=': '*',
    '/=': '/',
    '%=': '%',
};

export default function operatorOverloadPlugin({ types: t }) {
    return {
	visitor: {
	    BinaryExpression(path) {
		const { operator, left, right } = path.node;
		const fname = operatorToFunction[operator];
		if (!fname) return;

		const replacement = t.callExpression(
		    t.identifier(fname),
		    [left, right]
		);

		// 元の演算式の位置情報を引き継ぐ
		t.inherits(replacement, path.node);

		path.replaceWith(replacement);
	    },
	    
	    UnaryExpression(path) {
		const { operator, argument } = path.node;
		const fname = unaryOperatorToFunction[operator];
		if (!fname) return;

		const replacement = t.callExpression(
		    t.identifier(fname),
		    [argument]
		);

		t.inherits(replacement, path.node);
		path.replaceWith(replacement);
	    },
	    
	    AssignmentExpression(path) {
		const { operator, left, right } = path.node;
		const binOp = assignmentOperatorToBinary[operator];
		if (!binOp) return;
		
		const fname = operatorToFunction[binOp];

		// a += b  →  a = add(a, b)
		const replacement = t.assignmentExpression(
		    '=',
		    left,
		    t.callExpression(t.identifier(fname), [t.cloneNode(left), right])
		);

		t.inherits(replacement, path.node);
		
		path.replaceWith(replacement);
	    },
	},
    };
}
