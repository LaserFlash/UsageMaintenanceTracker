import { DialogsService } from './dialogs.service';
import { MatDialogModule, MatButtonModule  } from '@angular/material';
import { NgModule } from '@angular/core';

import { ConfirmDialog } from './confirm-dialog.component';
import { ImageModal } from './image-modal.component';

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule,
    ],
    exports: [
        ConfirmDialog,
        ImageModal,
    ],
    declarations: [
        ConfirmDialog,
        ImageModal,
    ],
    providers: [
        DialogsService,
    ],
    entryComponents: [
        ConfirmDialog,
        ImageModal,
    ],
})
export class DialogsModule { }
