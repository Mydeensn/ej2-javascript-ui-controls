import { createElement } from "@syncfusion/ej2-base";
import { TestHelper } from "../../test-helper.spec";
import { DocumentEditor } from "../../../src/document-editor/document-editor";
import { Editor } from "../../../src/document-editor/implementation/editor/editor";
import { Selection } from '../../../src/document-editor/implementation/selection/selection';
import { EditorHistory } from "../../../src/document-editor/implementation/editor-history/editor-history";
import { SfdtExport } from "../../../src/document-editor/implementation/writer/sfdt-export";
import { LineWidget, ParagraphWidget, ShapeElementBox, WordExport } from "../../../src/index";
describe('cut copy paste with Track changes', () => {
    let container: DocumentEditor;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        DocumentEditor.Inject(Editor, Selection, EditorHistory, SfdtExport);
        container = new DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableSfdtExport: true });
        (container.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (container.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (container.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (container.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        container.appendTo('#container');
    });
    afterAll((done): void => {
        container.destroy();
        document.body.removeChild(document.getElementById('container'));
        container = undefined;
        document.body.innerHTML = '';
        setTimeout(function () {
            done();
        }, 1000);
    });
    it('Copy text when trackchange is enabled and paste when trackchange disabled(local clipboard)', function () {
console.log('Copy text when trackchange is enabled and paste when trackchange disabled(local clipboard)');
        container.openBlank();
        container.enableTrackChanges = false;
        container.editor.insertText('Hello worlding');
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.enableTrackChanges = true;
        container.editor.delete();
        container.editor.insertText('World');
        container.selection.selectAll();
        container.selection.copy();
        container.enableTrackChanges = false;
        container.selection.handleRightKey();
        container.enableLocalPaste = true;
        container.editor.paste();
        var count = container.revisions.changes.length;
        expect(count).toBe(2);
    });
    it('Copy and paste text when track change is disabled (local clipboard)', function () {
console.log('Copy and paste text when track change is disabled (local clipboard)');
        container.openBlank();
        container.enableTrackChanges = false;
        container.editor.insertText('Hello worlding');
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.enableTrackChanges = true;
        container.editor.delete();
        container.editor.insertText('World');
        container.enableTrackChanges = false;
        container.selection.selectAll();
        container.selection.copy();
        container.selection.handleRightKey();
        container.enableLocalPaste = true;
        container.editor.paste();
        var count = container.revisions.changes.length;
        expect(count).toBe(4);
    });
    it('Copy and paste text when track change is enabled (local clipboard)', function () {
console.log('Copy and paste text when track change is enabled (local clipboard)');
        container.openBlank();
        container.enableTrackChanges = false;
        container.editor.insertText('Hello worlding');
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.enableTrackChanges = true;
        container.editor.delete();
        container.editor.insertText('World');
        container.selection.selectAll();
        container.selection.copy();
        container.selection.handleRightKey();
        container.enableLocalPaste = true;
        container.editor.paste();
        var count = container.revisions.changes.length;
        expect(count).toBe(3);
    });
    it('Copy when trackchange disabled and paste text when track change is enabled (local clipboard)', function () {
console.log('Copy when trackchange disabled and paste text when track change is enabled (local clipboard)');
        container.openBlank();
        container.enableTrackChanges = false;
        container.editor.insertText('Hello worlding');
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.enableTrackChanges = true;
        container.editor.delete();
        container.editor.insertText('World');
        container.enableTrackChanges = false;
        container.selection.selectAll();
        container.selection.copy();
        container.selection.handleRightKey();
        container.enableTrackChanges = true;
        container.enableLocalPaste = true;
        container.editor.paste();
        var count = container.revisions.changes.length;
        expect(count).toBe(3);
    });
    it('Cut text when trackchange is enabled and paste when trackchange disabled(local clipboard)', function () {
console.log('Cut text when trackchange is enabled and paste when trackchange disabled(local clipboard)');
        container.openBlank();
        container.enableTrackChanges = false;
        container.editor.insertText('Hello worlding');
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.enableTrackChanges = true;
        container.editor.delete();
        container.editor.insertText('World');
        container.selection.selectAll();
        container.editor.cut();
        container.enableTrackChanges = false;
        container.selection.moveToParagraphEnd();
        container.enableLocalPaste = true;
        container.editor.paste();
        var count = container.revisions.changes.length;
        expect(count).toBe(1);
    });
    it('Cut and paste text when track change is disabled (local clipboard)', function () {
console.log('Cut and paste text when track change is disabled (local clipboard)');
        container.openBlank();
        container.enableTrackChanges = false;
        container.enableLocalPaste = false;
        container.editor.insertText('Hello worlding');
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.enableTrackChanges = true;
        container.editor.delete();
        container.editor.insertText('World');
        container.selection.selectAll();
        container.enableTrackChanges = false;
        container.editor.cut();
        container.selection.handleEndKey();
        container.enableLocalPaste = true;
        container.editor.paste();
        var count = container.revisions.changes.length;
        expect(count).toBe(2);
    });
    it('Cut and paste text when track change is enabled (local clipboard)', function () {
console.log('Cut and paste text when track change is enabled (local clipboard)');
        container.openBlank();
        container.enableTrackChanges = false;
        container.enableLocalPaste = false;
        container.editor.insertText('Hello worlding');
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.enableTrackChanges = true;
        container.editor.delete();
        container.editor.insertText('World');
        container.selection.selectAll();
        container.editor.cut();
        container.selection.moveToParagraphEnd();
        container.enableLocalPaste = true;
        container.editor.paste();
        var count = container.revisions.changes.length;
        expect(count).toBe(2);
    });
    it('Cut when trackchange disabled and paste text when track change is enabled (local clipboard)', function () {
console.log('Cut when trackchange disabled and paste text when track change is enabled (local clipboard)');
        container.openBlank();
        container.enableTrackChanges = false;
        container.enableLocalPaste = false;
        container.enableLocalPaste = true;
        container.editor.insertText('Hellllo');
        container.enableTrackChanges = true;
        container.selection.moveToParagraphStart();
        container.editor.delete();
        container.editor.delete();
        container.editor.delete();
        container.editor.delete();
        container.editor.delete();
        container.editor.delete();
        container.editor.delete();
        container.selection.moveToParagraphEnd();
        container.editor.insertText('Hello world');
        container.enableTrackChanges = false;
        container.editor.insertText('welcome');
        container.selection.selectAll();
        container.editor.cut();
        container.selection.moveToParagraphEnd();
        container.enableTrackChanges = true;
        container.editor.paste();
        var count = container.revisions.changes.length;
        expect(count).toBe(2);
    });
    it('Copy text when trackchange is enabled and paste when trackchange disabled(local clipboard) with new author', function () {
console.log('Copy text when trackchange is enabled and paste when trackchange disabled(local clipboard) with new author');
        container.openBlank();
        container.enableTrackChanges = false;
        container.editor.insertText('Hello ');
        container.enableTrackChanges = true;
        container.currentUser = "user1";
        container.editor.insertText('World');
        container.enableTrackChanges = false;
        container.editor.insertText('welcome');
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.enableTrackChanges = true;
        container.editor.delete();
        container.selection.selectAll();
        container.selection.copy();
        container.enableTrackChanges = false;
        container.selection.handleRightKey();
        container.enableLocalPaste = true;
        container.editor.paste();
        var count = container.revisions.changes.length;
        expect(count).toBe(2);
    });
    it('Copy and paste text when track change is disabled (local clipboard) with new author', function () {
console.log('Copy and paste text when track change is disabled (local clipboard) with new author');
        container.openBlank();
        container.enableTrackChanges = false;
        container.editor.insertText('Hello ');
        container.enableTrackChanges = true;
        container.currentUser = "user1";
        container.editor.insertText('World');
        container.enableTrackChanges = false;
        container.editor.insertText('welcome');
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.enableTrackChanges = true;
        container.editor.delete();
        container.enableTrackChanges = false;
        container.selection.selectAll();
        container.selection.copy();
        container.selection.handleRightKey();
        container.enableLocalPaste = true;
        container.editor.paste();
        var count = container.revisions.changes.length;
        expect(count).toBe(4);
    });
    it('Copy and paste text when track change is enabled (local clipboard) with new author', function () {
console.log('Copy and paste text when track change is enabled (local clipboard) with new author');
        container.openBlank();
        container.enableTrackChanges = false;
        container.editor.insertText('Hello ');
        container.enableTrackChanges = true;
        container.currentUser = "user1";
        container.editor.insertText('World');
        container.enableTrackChanges = false;
        container.editor.insertText('welcome');
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.enableTrackChanges = true;
        container.editor.delete();
        container.selection.selectAll();
        container.selection.copy();
        container.selection.handleRightKey();
        container.enableLocalPaste = true;
        container.currentUser = "user2";
        container.editor.paste();
        var count = container.revisions.changes.length;
        expect(count).toBe(3);
    });
    it('Copy when trackchange disabled and paste text when track change is enabled (local clipboard) with new author', function () {
console.log('Copy when trackchange disabled and paste text when track change is enabled (local clipboard) with new author');
        container.openBlank();
        container.enableTrackChanges = false;
        container.editor.insertText('Hello ');
        container.enableTrackChanges = true;
        container.currentUser = "user1";
        container.editor.insertText('World');
        container.enableTrackChanges = false;
        container.editor.insertText('welcome');
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.enableTrackChanges = true;
        container.editor.delete();
        container.enableTrackChanges = false;
        container.selection.selectAll();
        container.selection.copy();
        container.selection.handleRightKey();
        container.enableTrackChanges = true;
        container.enableLocalPaste = true;
        container.currentUser = "user2";
        container.editor.paste();
        var count = container.revisions.changes.length;
        expect(count).toBe(4);
    });
    it('Cut and paste text when track change is disabled (local clipboard)', function () {
console.log('Cut and paste text when track change is disabled (local clipboard)');
        container.openBlank();
        container.enableTrackChanges = false;
        container.editor.insertText('Hello ');
        container.enableTrackChanges = true;
        container.currentUser = "user1";
        container.editor.insertText('World');
        container.enableTrackChanges = false;
        container.editor.insertText('welcome');
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.enableTrackChanges = true;
        container.editor.delete();
        container.selection.selectAll();
        container.enableTrackChanges = false;
        container.editor.cut();
        container.selection.handleEndKey();
        container.enableLocalPaste = true;
        container.editor.paste();
        var count = container.revisions.changes.length;
        expect(count).toBe(2);
    });
    it('Cut when trackchange disabled and paste text when track change is enabled (local clipboard)', function () {
console.log('Cut when trackchange disabled and paste text when track change is enabled (local clipboard)');
        container.openBlank();
        container.enableTrackChanges = false;
        container.editor.insertText('Hello ');
        container.enableTrackChanges = true;
        container.currentUser = "user1";
        container.editor.insertText('World');
        container.enableTrackChanges = false;
        container.editor.insertText('welcome');
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.selection.handleShiftLeftKey();
        container.enableTrackChanges = true;
        container.editor.delete();
        container.selection.selectAll();
        container.enableTrackChanges = false;
        container.editor.cut();
        container.selection.moveToParagraphEnd();
        container.enableTrackChanges = true;
        container.enableLocalPaste = true;
        container.currentUser = "user2";
        container.editor.paste();
        var count = container.revisions.changes.length;
        expect(count).toBe(2);
    });
});

describe('Field result text with multiple lines', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, isReadOnly: false });
        DocumentEditor.Inject(Editor, Selection, EditorHistory); editor.enableEditorHistory = true;
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(function () {
            done();
        }, 1000);
    });

    it('Field result text with multiple lines Validation', () => {
        editor.enableTrackChanges = true;
        expect(() => { editor.editor.insertField("MERGEFIELD " + "Adventure Works Cycles, the fictitious company on which the AdventureWorks sample databases are based, is a large, multinational " + " * MERGEFORMAT", "Adventure Works Cycles, the fictitious company on which the AdventureWorks sample databases are based, is a large, multinational "); }).not.toThrowError();
     });
});
let trackData: any = {
	"sections": [
		{
			"sectionFormat": {
				"pageWidth": 612,
				"pageHeight": 792,
				"leftMargin": 72,
				"rightMargin": 72,
				"topMargin": 72,
				"bottomMargin": 72,
				"differentFirstPage": false,
				"differentOddAndEvenPages": false,
				"headerDistance": 36,
				"footerDistance": 36,
				"bidi": false
			},
			"blocks": [
				{
					"paragraphFormat": {
						"styleName": "Normal",
						"listFormat": {}
					},
					"characterFormat": {},
					"inlines": []
				},
				{
					"paragraphFormat": {
						"styleName": "Normal",
						"listFormat": {}
					},
					"characterFormat": {},
					"inlines": []
				}
			],
			"headersFooters": {
				"header": {
					"blocks": [
						{
							"paragraphFormat": {
								"listFormat": {}
							},
							"characterFormat": {},
							"inlines": []
						}
					]
				},
				"footer": {
					"blocks": [
						{
							"paragraphFormat": {
								"listFormat": {}
							},
							"characterFormat": {},
							"inlines": []
						}
					]
				},
				"evenHeader": {},
				"evenFooter": {},
				"firstPageHeader": {},
				"firstPageFooter": {}
			}
		}
	],
	"characterFormat": {
		"bold": false,
		"italic": false,
		"fontSize": 11,
		"fontFamily": "Calibri",
		"underline": "None",
		"strikethrough": "None",
		"baselineAlignment": "Normal",
		"highlightColor": "NoColor",
		"fontColor": "#00000000",
		"boldBidi": false,
		"italicBidi": false,
		"fontSizeBidi": 11,
		"fontFamilyBidi": "Calibri",
		"allCaps": false
	},
	"paragraphFormat": {
		"leftIndent": 0,
		"rightIndent": 0,
		"firstLineIndent": 0,
		"textAlignment": "Left",
		"beforeSpacing": 0,
		"afterSpacing": 0,
		"lineSpacing": 1,
		"lineSpacingType": "Multiple",
		"listFormat": {},
		"bidi": false,
		"keepLinesTogether": false,
		"keepWithNext": false,
		"widowControl": true
	},
	"defaultTabWidth": 36,
	"trackChanges": false,
	"enforcement": false,
	"hashValue": "",
	"saltValue": "",
	"formatting": false,
	"protectionType": "NoProtection",
	"dontUseHTMLParagraphAutoSpacing": false,
	"formFieldShading": true,
	"compatibilityMode": "Word2013",
	"styles": [
		{
			"name": "Normal",
			"type": "Paragraph",
			"paragraphFormat": {
				"listFormat": {}
			},
			"characterFormat": {},
			"next": "Normal"
		},
		{
			"name": "Heading 1",
			"type": "Paragraph",
			"paragraphFormat": {
				"leftIndent": 0,
				"rightIndent": 0,
				"firstLineIndent": 0,
				"textAlignment": "Left",
				"beforeSpacing": 12,
				"afterSpacing": 0,
				"lineSpacing": 1.0791666507720948,
				"lineSpacingType": "Multiple",
				"outlineLevel": "Level1",
				"listFormat": {}
			},
			"characterFormat": {
				"fontSize": 16,
				"fontFamily": "Calibri Light",
				"fontColor": "#2F5496",
				"fontSizeBidi": 16,
				"fontFamilyBidi": "Calibri Light"
			},
			"basedOn": "Normal",
			"link": "Heading 1 Char",
			"next": "Normal"
		},
		{
			"name": "Heading 1 Char",
			"type": "Character",
			"characterFormat": {
				"fontSize": 16,
				"fontFamily": "Calibri Light",
				"fontColor": "#2F5496",
				"fontSizeBidi": 16,
				"fontFamilyBidi": "Calibri Light"
			},
			"basedOn": "Default Paragraph Font"
		},
		{
			"name": "Default Paragraph Font",
			"type": "Character",
			"characterFormat": {}
		},
		{
			"name": "Heading 2",
			"type": "Paragraph",
			"paragraphFormat": {
				"leftIndent": 0,
				"rightIndent": 0,
				"firstLineIndent": 0,
				"textAlignment": "Left",
				"beforeSpacing": 2,
				"afterSpacing": 0,
				"lineSpacing": 1.0791666507720948,
				"lineSpacingType": "Multiple",
				"outlineLevel": "Level2",
				"listFormat": {}
			},
			"characterFormat": {
				"fontSize": 13,
				"fontFamily": "Calibri Light",
				"fontColor": "#2F5496",
				"fontSizeBidi": 13,
				"fontFamilyBidi": "Calibri Light"
			},
			"basedOn": "Normal",
			"link": "Heading 2 Char",
			"next": "Normal"
		},
		{
			"name": "Heading 2 Char",
			"type": "Character",
			"characterFormat": {
				"fontSize": 13,
				"fontFamily": "Calibri Light",
				"fontColor": "#2F5496",
				"fontSizeBidi": 13,
				"fontFamilyBidi": "Calibri Light"
			},
			"basedOn": "Default Paragraph Font"
		},
		{
			"name": "Heading 3",
			"type": "Paragraph",
			"paragraphFormat": {
				"leftIndent": 0,
				"rightIndent": 0,
				"firstLineIndent": 0,
				"textAlignment": "Left",
				"beforeSpacing": 2,
				"afterSpacing": 0,
				"lineSpacing": 1.0791666507720948,
				"lineSpacingType": "Multiple",
				"outlineLevel": "Level3",
				"listFormat": {}
			},
			"characterFormat": {
				"fontSize": 12,
				"fontFamily": "Calibri Light",
				"fontColor": "#1F3763",
				"fontSizeBidi": 12,
				"fontFamilyBidi": "Calibri Light"
			},
			"basedOn": "Normal",
			"link": "Heading 3 Char",
			"next": "Normal"
		},
		{
			"name": "Heading 3 Char",
			"type": "Character",
			"characterFormat": {
				"fontSize": 12,
				"fontFamily": "Calibri Light",
				"fontColor": "#1F3763",
				"fontSizeBidi": 12,
				"fontFamilyBidi": "Calibri Light"
			},
			"basedOn": "Default Paragraph Font"
		},
		{
			"name": "Heading 4",
			"type": "Paragraph",
			"paragraphFormat": {
				"leftIndent": 0,
				"rightIndent": 0,
				"firstLineIndent": 0,
				"textAlignment": "Left",
				"beforeSpacing": 2,
				"afterSpacing": 0,
				"lineSpacing": 1.0791666507720948,
				"lineSpacingType": "Multiple",
				"outlineLevel": "Level4",
				"listFormat": {}
			},
			"characterFormat": {
				"italic": true,
				"fontFamily": "Calibri Light",
				"fontColor": "#2F5496",
				"italicBidi": true,
				"fontFamilyBidi": "Calibri Light"
			},
			"basedOn": "Normal",
			"link": "Heading 4 Char",
			"next": "Normal"
		},
		{
			"name": "Heading 4 Char",
			"type": "Character",
			"characterFormat": {
				"italic": true,
				"fontFamily": "Calibri Light",
				"fontColor": "#2F5496",
				"italicBidi": true,
				"fontFamilyBidi": "Calibri Light"
			},
			"basedOn": "Default Paragraph Font"
		},
		{
			"name": "Heading 5",
			"type": "Paragraph",
			"paragraphFormat": {
				"leftIndent": 0,
				"rightIndent": 0,
				"firstLineIndent": 0,
				"textAlignment": "Left",
				"beforeSpacing": 2,
				"afterSpacing": 0,
				"lineSpacing": 1.0791666507720948,
				"lineSpacingType": "Multiple",
				"outlineLevel": "Level5",
				"listFormat": {}
			},
			"characterFormat": {
				"fontFamily": "Calibri Light",
				"fontColor": "#2F5496",
				"fontFamilyBidi": "Calibri Light"
			},
			"basedOn": "Normal",
			"link": "Heading 5 Char",
			"next": "Normal"
		},
		{
			"name": "Heading 5 Char",
			"type": "Character",
			"characterFormat": {
				"fontFamily": "Calibri Light",
				"fontColor": "#2F5496",
				"fontFamilyBidi": "Calibri Light"
			},
			"basedOn": "Default Paragraph Font"
		},
		{
			"name": "Heading 6",
			"type": "Paragraph",
			"paragraphFormat": {
				"leftIndent": 0,
				"rightIndent": 0,
				"firstLineIndent": 0,
				"textAlignment": "Left",
				"beforeSpacing": 2,
				"afterSpacing": 0,
				"lineSpacing": 1.0791666507720948,
				"lineSpacingType": "Multiple",
				"outlineLevel": "Level6",
				"listFormat": {}
			},
			"characterFormat": {
				"fontFamily": "Calibri Light",
				"fontColor": "#1F3763",
				"fontFamilyBidi": "Calibri Light"
			},
			"basedOn": "Normal",
			"link": "Heading 6 Char",
			"next": "Normal"
		},
		{
			"name": "Heading 6 Char",
			"type": "Character",
			"characterFormat": {
				"fontFamily": "Calibri Light",
				"fontColor": "#1F3763",
				"fontFamilyBidi": "Calibri Light"
			},
			"basedOn": "Default Paragraph Font"
		}
	],
	"lists": [],
	"abstractLists": [],
	"comments": [],
	"revisions": [],
	"customXml": []
}
describe('Track changes validation', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, isReadOnly: false });
        DocumentEditor.Inject(Editor, Selection, EditorHistory); editor.enableEditorHistory = true;
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(function () {
            done();
        }, 1000);
    });

    it('track changes Validation', () => {
        editor.open(JSON.stringify(trackData));
        editor.enableTrackChanges = true;
        editor.editor.insertText('test1');
        editor.selection.moveDown();
        editor.editor.insertText('test2');
        editor.selection.moveToLineStart();
        editor.editor.handleBackKey();
        expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets.length).toBe(2);
     });
});
describe('Track changes empty para delete validation', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, isReadOnly: false });
        DocumentEditor.Inject(Editor, Selection, EditorHistory); editor.enableEditorHistory = true;
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(function () {
            done();
        }, 1000);
    });
    it('Track changes empty para backspace validation', () => {
        editor.openBlank();
        editor.enableTrackChanges = true;
        editor.editor.handleEnterKey();
        editor.editor.handleEnterKey();
        let para: ParagraphWidget = editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0] as ParagraphWidget;
        expect(para.characterFormat.revisions.length).toBe(1);
        editor.editor.handleBackKey();
        editor.editor.handleBackKey();
        para = editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0] as ParagraphWidget;
        expect(para.characterFormat.revisions.length).toBe(0);
    });
    it('Track changes empty para delete validation', () => {
        editor.openBlank();
        editor.enableTrackChanges = true;
        editor.editor.handleEnterKey();
        editor.editor.handleEnterKey();
        let para: ParagraphWidget = editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0] as ParagraphWidget;
        expect(para.characterFormat.revisions.length).toBe(1);
        editor.selection.moveToDocumentStart();
        editor.editor.handleDelete();
        editor.editor.handleDelete();
        para = editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0] as ParagraphWidget;
        expect(para.characterFormat.revisions.length).toBe(0);
    });
});
describe('Track change reject validation', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, isReadOnly: false });
        DocumentEditor.Inject(Editor, Selection, EditorHistory); editor.enableEditorHistory = true;
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(function () {
            done();
        }, 1000);
    });
    it("Track change reject validation",()=>{
        editor.editor.insertTable(1,1);
        editor.selection.checkForCursorVisibility();
        editor.editor.insertText("hello");
        editor.enableTrackChanges = true;
        editor.selection.handleControlHomeKey();
        editor.editor.onEnter();
        editor.editor.onEnter();
        editor.editor.onEnter();
        expect(editor.revisions.changes[0].range.length).toBe(3);
        editor.revisions.rejectAll();
        expect(editor.revisions.changes.length).toBe(0);
    });
});
let shapeElement: any = {"sections":[{"sectionFormat":{"pageWidth":612,"pageHeight":792,"leftMargin":72,"rightMargin":72,"topMargin":72,"bottomMargin":72,"differentFirstPage":false,"differentOddAndEvenPages":false,"headerDistance":36,"footerDistance":36,"bidi":false,"pageNumberStyle":"Arabic"},"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{},"inlines":[{"characterFormat":{},"shapeId":1,"name":"Rectangle 1","visible":true,"width":338,"height":171.5,"widthScale":100,"heightScale":100,"verticalPosition":0,"verticalOrigin":"Paragraph","verticalAlignment":"None","verticalRelativePercent":-3.40282347e+38,"horizontalPosition":27,"horizontalOrigin":"Column","horizontalAlignment":"None","horizontalRelativePercent":-3.40282347e+38,"zOrderPosition":251659264,"allowOverlap":true,"textWrappingStyle":"InFrontOfText","textWrappingType":"Both","distanceBottom":0,"distanceLeft":9,"distanceRight":9,"distanceTop":0,"layoutInCell":true,"lockAnchor":false,"autoShapeType":"Rectangle","fillFormat":{"color":"#4472C4FF","fill":true},"lineFormat":{"lineFormatType":"Solid","color":"#2F528FFF","weight":1,"lineStyle":"Solid","line":true},"textFrame":{"textVerticalAlignment":"Middle","leftMargin":7.2,"rightMargin":7.2,"topMargin":3.6,"bottomMargin":3.6,"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{},"inlines":[]}]},"revisionIds":["54c513f2-eaec-45e1-840d-44ff3a56e34d"]}]}],"headersFooters":{}}],"characterFormat":{"bold":false,"italic":false,"fontSize":11,"fontFamily":"Calibri","underline":"None","strikethrough":"None","baselineAlignment":"Normal","highlightColor":"NoColor","fontColor":"#00000000","boldBidi":false,"italicBidi":false,"fontSizeBidi":11,"fontFamilyBidi":"Calibri","allCaps":false},"paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":0,"afterSpacing":8,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","listFormat":{},"bidi":false,"keepLinesTogether":false,"keepWithNext":false,"widowControl":true},"defaultTabWidth":36,"trackChanges":true,"enforcement":false,"hashValue":"","saltValue":"","formatting":false,"protectionType":"NoProtection","dontUseHTMLParagraphAutoSpacing":false,"formFieldShading":true,"compatibilityMode":"Word2013","styles":[{"name":"Normal","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{},"next":"Normal"},{"name":"Default Paragraph Font","type":"Character","characterFormat":{}},{"name":"Heading 1","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":12,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level1","listFormat":{}},"characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":16,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 1 Char","next":"Normal"},{"name":"Heading 1 Char","type":"Character","characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":16,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 2","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level2","listFormat":{}},"characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 2 Char","next":"Normal"},{"name":"Heading 2 Char","type":"Character","characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 3","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level3","listFormat":{}},"characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 3 Char","next":"Normal"},{"name":"Heading 3 Char","type":"Character","characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 4","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level4","listFormat":{}},"characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496","italicBidi":true,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 4 Char","next":"Normal"},{"name":"Heading 4 Char","type":"Character","characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496","italicBidi":true,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 5","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level5","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 5 Char","next":"Normal"},{"name":"Heading 5 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 6","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level6","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 6 Char","next":"Normal"},{"name":"Heading 6 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"}],"lists":[],"abstractLists":[],"comments":[],"revisions":[{"author":"Balamurugan Shanmugam","date":"2022-05-28T11:58:00Z","revisionType":"Insertion","revisionId":"54c513f2-eaec-45e1-840d-44ff3a56e34d"}],"customXml":[],"footnotes":{"separator":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{},"inlines":[{"characterFormat":{},"text":"\u0003"}]}],"continuationSeparator":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{},"inlines":[{"characterFormat":{},"text":"\u0004"}]}],"continuationNotice":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{},"inlines":[]}]},"endnotes":{"separator":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{},"inlines":[{"characterFormat":{},"text":"\u0003"}]}],"continuationSeparator":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{},"inlines":[{"characterFormat":{},"text":"\u0004"}]}],"continuationNotice":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{},"inlines":[]}]}};
describe('Track changes in ShapeElement validation', () => {
    let container: DocumentEditor;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        DocumentEditor.Inject(Editor, Selection, EditorHistory, SfdtExport);
        container = new DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableSfdtExport: true, enableRtl: true });
        (container.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (container.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (container.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (container.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        container.appendTo('#container');
    });
    afterAll((done): void => {
        container.destroy();
        document.body.removeChild(document.getElementById('container'));
        container = undefined;
        document.body.innerHTML = '';
        setTimeout(function () {
            done();
        }, 1000);
    });
    it('ShapeElement Track changes Reject validation ', () => {
        container.open(shapeElement);
        container.revisionsInternal.rejectAll();
        let para: ParagraphWidget = container.documentHelper.pages[0].bodyWidgets[0].childWidgets[0] as ParagraphWidget;
        let line: LineWidget = para.childWidgets[0] as LineWidget;
        expect(container.revisions.changes.length).toBe(0);
        expect(line.children.length).toBe(0);
        expect(para.floatingElements.length).toBe(0);
        expect(container.documentHelper.pages[0].bodyWidgets[0].floatingElements.length).toBe(0);
    });
});
describe('acceptAll and rejectAll validation with table', () => {
    let container: DocumentEditor;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        DocumentEditor.Inject(Editor, Selection, EditorHistory, SfdtExport);
        container = new DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableSfdtExport: true, enableRtl: true });
        (container.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (container.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (container.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (container.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        container.appendTo('#container');
    });
    afterAll((done): void => {
        container.destroy();
        document.body.removeChild(document.getElementById('container'));
        container = undefined;
        document.body.innerHTML = '';
        setTimeout(function () {
            done();
        }, 1000);
    });
    it('Check the empty paragraph insertion', () => {
        container.openBlank();
        container.enableTrackChanges = true;
        container.editor.insertText('hello');
        container.editor.insertTable(2, 2);
        container.documentHelper.selection.select('0;2;0', '0;2;0')
        expect(container.editor.onEnter()).not.toThrowError;
    });
    it('acceptAll and rejectAll validation with table', () => {
        container.openBlank();
        container.enableTrackChanges = true;
        container.editor.insertTable(2, 2);
        container.revisions.acceptAll();
        expect(container.revisions.length).toBe(0);
        container.openBlank();
        container.enableTrackChanges = true;
        container.editor.insertTable(2, 2);
        container.revisions.rejectAll();
        expect(container.revisions.length).toBe(0);
    });
});
let revisionTest: any = {"sections":[{"blocks":[{"inlines":[{"text":"Multiple user insertion test","revisionIds":["7c350428-5852-4dab-af9e-b0fc3ca0d8b4","5c7a7027-2155-4e15-af5f-f5442085b626"]}]},{"inlines":[{"text":"Different user Insertion and Deletion test","revisionIds":["deff8324-3c12-4fdf-b43c-038b4f2dee50","a8700c18-9ab6-4674-9394-3d38e1774fa0"]}]}],"headersFooters":{},"sectionFormat":{"headerDistance":36.0,"footerDistance":36.0,"pageWidth":612.0,"pageHeight":792.0,"leftMargin":72.0,"rightMargin":72.0,"topMargin":72.0,"bottomMargin":72.0,"differentFirstPage":false,"differentOddAndEvenPages":false,"bidi":false,"restartPageNumbering":false,"pageStartingNumber":0,"endnoteNumberFormat":"LowerCaseRoman","footNoteNumberFormat":"Arabic","restartIndexForFootnotes":"DoNotRestart","restartIndexForEndnotes":"DoNotRestart","pageNumberStyle":"Arabic","columns":{"column":[{"width":468.0,"space":36.0}],"numberOfColumns":1,"equalWidth":true}}}],"fontSubstitutionTable":{"Latha":"Latha"},"characterFormat":{"fontSize":11.0,"fontFamily":"Calibri","fontSizeBidi":11.0,"fontFamilyBidi":"Arial","localeId":1033,"localeIdEastAsia":1033,"localeIdBidi":1025},"paragraphFormat":{"afterSpacing":8.0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple"},"background":{"color":"#FFFFFFFF"},"styles":[{"type":"Paragraph","name":"Normal","next":"Normal"},{"type":"Character","name":"Default Paragraph Font"},{"type":"Paragraph","name":"Revision","next":"Revision","paragraphFormat":{"afterSpacing":0.0,"lineSpacing":1.0,"lineSpacingType":"Multiple"}}],"revisions":[{"author":"Johnson","date":"2022-10-12T19:25:00Z","revisionType":"Insertion","revisionId":"7c350428-5852-4dab-af9e-b0fc3ca0d8b4"},{"author":"Thamizhselvan Varadharajan","date":"2022-10-12T19:23:00Z","revisionType":"Insertion","revisionId":"5c7a7027-2155-4e15-af5f-f5442085b626"},{"author":"Thamizhselvan Varadharajan","date":"2022-10-12T19:25:00Z","revisionType":"Deletion","revisionId":"deff8324-3c12-4fdf-b43c-038b4f2dee50"},{"author":"Johnson","date":"2022-10-12T19:04:00Z","revisionType":"Insertion","revisionId":"a8700c18-9ab6-4674-9394-3d38e1774fa0"}],"defaultTabWidth":36.0,"formatting":false,"trackChanges":false,"protectionType":"NoProtection","enforcement":false,"dontUseHTMLParagraphAutoSpacing":false,"alignTablesRowByRow":false,"formFieldShading":true,"footnotes":{"separator":[{"inlines":[{"text":"\u0003"}]}],"continuationSeparator":[{"inlines":[{"text":"\u0004"}]}],"continuationNotice":[{"inlines":[]}]},"endnotes":{"separator":[{"inlines":[{"text":"\u0003"}]}],"continuationSeparator":[{"inlines":[{"text":"\u0004"}]}],"continuationNotice":[{"inlines":[]}]},"compatibilityMode":"Word2013"};
describe('Multiple User insertion and Deletion Validation', () => {
    let container: DocumentEditor;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        DocumentEditor.Inject(Editor, Selection, EditorHistory, SfdtExport);
        container = new DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableSfdtExport: true, enableRtl: true });
        (container.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (container.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (container.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (container.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        container.appendTo('#container');
    });
    afterAll((done): void => {
        container.destroy();
        document.body.removeChild(document.getElementById('container'));
        container = undefined;
        document.body.innerHTML = '';
        setTimeout(function () {
            done();
        }, 1000);
    });
    it('Two different User insertion and deletion test', () => {
        expect(container.open(revisionTest)).not.toThrowError;
    });
});

describe('Footnote delete validation while track changes enabled', () => {
    let container: DocumentEditor;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        DocumentEditor.Inject(Editor, Selection, EditorHistory, SfdtExport, WordExport);
        container = new DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableSfdtExport: true, enableRtl: true });
        (container.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (container.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (container.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (container.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        container.appendTo('#container');
    });
    afterAll((done): void => {
        container.destroy();
        document.body.removeChild(document.getElementById('container'));
        container = undefined;
        document.body.innerHTML = '';
        setTimeout(function () {
            done();
        }, 1000);
    });
    it('Do not remove footnote while deleting the footnote reference while track changes enabled', () => {
        console.log('Do not remove footnote while deleting the footnote reference while track changes enabled');
        container.openBlank();
        container.editor.insertText('Hello');
        container.selection.select('0;0;2','0;0;2');
        container.editor.insertFootnote();
        container.editor.insertText('One');
        container.enableTrackChanges = true;
        container.selection.selectAll();
        container.editor.delete();
        container.selection.select('0;0;2','0;0;2');
        container.editor.delete();
        expect(container.documentHelper.pages[0].footnoteWidget).not.toBe(undefined);
    });
    it('To check revision parsed for FootNote Reference', () => {
        console.log('To check revision parsed for FootNote Reference');
        let sfdt : any = container.sfdtExportModule.write();
        expect(sfdt.sec[0].b[0].i[1].rids.length).toBe(1);
    });
});

describe('Undo/Redo validation in Footnote', () => {
    let container: DocumentEditor;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        DocumentEditor.Inject(Editor, Selection, EditorHistory, SfdtExport, WordExport);
        container = new DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableSfdtExport: true, enableRtl: true });
        (container.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (container.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (container.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (container.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        container.appendTo('#container');
    });
    afterAll((done): void => {
        container.destroy();
        document.body.removeChild(document.getElementById('container'));
        container = undefined;
        document.body.innerHTML = '';
        setTimeout(function () {
            done();
        }, 1000);
    });
    it('Undo/Redo validation in Footnote', () => {
        console.log('Undo/Redo validation in Footnote');
        container.openBlank();
        container.editor.insertText('Hello');
        container.selection.select('0;0;2','0;0;2');
        container.editor.insertFootnote();
        container.editor.insertText('One');
        container.enableTrackChanges = true;
        container.selection.selectAll();
        container.editor.delete();
        expect(container.revisions.length).toBe(1);
        container.editorHistory.undo();
        expect(container.revisions.length).toBe(0);

        container.selection.select('0;0;2','0;0;2');
        container.editor.delete();
        expect(container.revisions.length).toBe(2);
        container.editorHistory.undo();
        expect(container.revisions.length).toBe(0);
        container.editorHistory.redo();
        expect(container.revisions.length).toBe(2);
    });
});