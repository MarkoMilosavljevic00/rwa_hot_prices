import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactionComponent } from './components/reaction.component';

import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reactionReducer } from './state/reaction.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ReactionEffects } from './state/reaction.effects';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ReactionComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    StoreModule.forFeature('reaction', reactionReducer),
    EffectsModule.forFeature([ReactionEffects]),
  ],
  exports: [
    ReactionComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ReactionModule { }
